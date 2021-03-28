(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var isFunction = function isFunction(val) {
    return typeof val === 'function';
  };
  var isObject = function isObject(val) {
    return _typeof(val) === 'object' && val !== null;
  };
  var isArray = function isArray(val) {
    return Array.isArray(val);
  };
  var compileTemplate = {
    // 匹配标签名
    tag: "[a-zA-Z][0-9a-zA-Z]*",
    // 匹配标签开始
    startTag: function startTag(html) {
      var reg = new RegExp("^<(".concat(compileTemplate.tag, ")"));
      return html.match(reg);
    },
    // 匹配标签属性
    tagAttributes: function tagAttributes(text) {
      // 标签属性有3种,a=b a='b' a="b",前后可能有多个空格
      var reg = /\s*([^=\s'"\/<>]+)\s*=\s*(?:"([^"]+)")|(?:'([^']+)')|([^\s"'=<>`]+)?/;
      return text.match(reg);
    },
    // 匹配标签结束
    tagClose: function tagClose(text) {
      // 可能为自结束标签，可以为> ,/>
      var reg = /^\s*(\/?)>/;
      return text.match(reg);
    },
    // 匹配结束标签
    closeTag: function closeTag(text) {
      // </div >
      var reg = new RegExp("^</(".concat(compileTemplate.tag, ")*>"));
      return text.match(reg);
    },
    // 匹配插值语法
    qn: function qn(text) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var reg = /\{\{([\s\S]*?)\}\}/g;
      return count ? text.match(reg) : reg;
    }
  };
  var callbacks = [];
  var watting = false;
  function nextTick(cb) {
    // 按照正常来说，肯定是内部源码调用的nextTick先进来，然后再是函数，因为代码是一行行执行的
    callbacks.push(cb); // 也要做防抖，不能每次调用nextTick都循环一次

    if (!watting) {
      watting = true;
      Promise.resolve().then(flushCallbacks);
    }
  }

  function flushCallbacks() {
    for (var i = 0; i < callbacks.length; i++) {
      var cb = callbacks[i];
      cb();
    }

    callbacks = [];
    watting = false;
  }

  var oldArrayProto = Array.prototype;
  var arrayMethods = Object.create(oldArrayProto);
  var methods = ['shift', 'unshift', 'sort', 'pop', 'splice', 'push', 'reverse'];
  methods.forEach(function (method) {
    // 对数组方法进行重写
    arrayMethods[method] = function () {
      var _oldArrayProto$method;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));

      var ob = this.__ob__; // 拿到Observe实例
      // 如果方法是新增属性的，那么我们要对新增的属性再次进行响应式处理

      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      }

      if (inserted) {
        // 说明调用了push/unshift/splice等方法
        // 将新增的数据定义成响应式
        ob.observeArray(inserted);
      } // 调用了数组的变异方法，就要通知watcher进行更新


      ob.dep.notify();
    };
  });

  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        if (Dep.target) {
          // Dep.target就是watcher
          Dep.target.addDeps(this); // this是当前实例dep
        }
      }
    }, {
      key: "addSubs",
      value: function addSubs(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();

  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget() {
    Dep.target = null;
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);

      // 只要类型是对象的都分配dep属性
      this.dep = new Dep(); // 响应式属性里都会有一个__ob__属性
      // data.__ob__ = this // 这么写会导致爆栈，因为一直在调用walk方法，然后一直在循环调用new Observe

      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false // 不可被枚举(遍历)

      }); // 如果数据为一个数组，那么也会进来，此时我们要改写数组中的方法

      if (isArray(data)) {
        // 改写数组的方法
        data.__proto__ = arrayMethods;
        this.observeArray(data); // 对数组中是对象的定义成响应式
      } else {
        this.walk(data);
      }
    }

    _createClass(Observe, [{
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          observe(item);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          var value = data[key];
          defineReactive(data, key, value);
        });
      }
    }]);

    return Observe;
  }();

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i]; // current就是嵌套的数组

      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function defineReactive(data, key, value) {
    // 如果对象嵌套对象，继续进行递归观测
    var childOb = observe(value); // 每个属性都有自己的dep

    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        // 先执行的是pushTarget方法存放了watcher，然后挂载组件，模板中使用了vm上的属性，会触发get，进来
        if (Dep.target) {
          dep.depend(); // 存放watcher
          // console.log(value)
          // console.log(childOb)

          if (childOb) {
            // 说明数组或者对象(引用类型)中也需要收集watcher
            childOb.dep.depend(); // 数组嵌套数组,也要考虑，因为数组嵌套数组，也会生成一个新的dep，新的dep也要去收集Watcher

            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newVal) {
        if (value !== newVal) {
          // 如果用户新赋值一个对象，那么新对象也要进行观测
          observe(newVal);
          value = newVal; // 通知watcher去更新

          dep.notify();
        }
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) return;
    if (data.__ob__) return data.__ob__;
    return new Observe(data);
  }

  function initState(vm) {
    initData(vm); // 挂载

    if (vm.$options.el) {
      vm.$mount(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        vm[source][key] = newVal;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = isFunction(data) ? data.call(vm) : data; // 所有的数据现在都在_data中，那么我们做一层数据代理，外界访问vm.xxx的时候我们去vm._data中读取xxx

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  function patch(oldVnode, vNode) {
    // 新旧虚拟dom比较,暂时不做
    var parent = oldVnode.parentNode;

    if (parent.nodeType === 1) {
      // 真实元素
      var elm = createEl(vNode);
      parent.insertBefore(elm, oldVnode.nextSibling);
      parent.removeChild(oldVnode);
      return elm;
    }
  }

  function createEl(vNode) {
    vNode.vm;
        var text = vNode.text;
        vNode.key;
        var children = vNode.children,
        tag = vNode.tag;
        vNode.data;
    var elm = '';

    if (tag) {
      // 标签
      elm = document.createElement(tag);

      if (children && children.length) {
        for (var i = 0; i < children.length; i++) {
          var item = children[i];
          elm.appendChild(createEl(item));
        }
      }
    } else {
      // 文本
      elm = document.createTextNode(text);
    }

    return elm;
  }

  var queue = [];
  var obj = {};
  var pending = false;
  function queueWatcher(watcher) {
    var id = watcher.id;

    if (!obj[id]) {
      queue.push(watcher);
      obj[id] = true;

      if (!pending) {
        pending = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  function flushSchedulerQueue() {
    for (var i = 0; i < queue.length; i++) {
      queue[i].run();
    }

    queue = [];
    obj = {};
    pending = false;
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    /**
     * 
     * @param {*} vm Vue实例
     * @param {*} updateFnOrExpr 更新的方法或者表达式
     * @param {*} cb 自定义回调函数
     * @param {*} options 其他选项配置
     */
    function Watcher(vm, updateFnOrExpr, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.id = id$1++; // 每个watcher都是单独的，用id来区分一下

      this.updateFnOrExpr = updateFnOrExpr;
      this.cb = cb;
      this.options = options;
      this.deps = [];
      this.depsId = new Set();
      this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // 这个方法会触发Object.defineProperty中的get，会去vm上面取值

        this.updateFnOrExpr();
        popTarget(); // 在外面用vm上的属性是不需要收集Watcher的
      } // 存放dep,如果模板中使用了2次 {{ name }} {{ name }},他们其实用的是一个id，那么我们就不需要存放到数组中，需要进行去重

    }, {
      key: "addDeps",
      value: function addDeps(dep) {
        var id = dep.id;

        if (!this.depsId.has(id)) {
          this.depsId.add(id);
          this.deps.push(dep); // 调用dep的addSubs方法来存放watcher

          dep.addSubs(this);
        }
      } // Vue中是异步更新的，主要是做一个缓存等待
      // 如果watcher的id都是一样，那么要进行去重，而且只需要更新一次即可 (防抖) ，同一个页面多个dep公共一个watcher
      // 所以Vue内部更新原理是: 去重 + 防抖

    }, {
      key: "update",
      value: function update() {
        queueWatcher(this);
      }
    }, {
      key: "run",
      value: function run() {
        console.log(111);
        this.get();
      }
    }]);

    return Watcher;
  }();

  function mountComponent(vm, el) {
    var updateComponent = function updateComponent() {
      // 生成虚拟dom
      var vNode = vm._render(); // 更新


      vm._update(vNode);
    }; // updateComponent() ==> 更新组件
    // 这里渲染的时候我们创建一个Watcher，在Watcher中更新组件


    new Watcher(vm, updateComponent, function () {
      console.log('update view');
    }, true); // true代表是一个渲染Watcher
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vNode) {
      var vm = this;
      vm.$el = patch(vm.$el, vNode);
    };

    Vue.prototype.$nextTick = nextTick;
  }

  var root = null; // 栈

  var stack = []; // 创建ast语法树

  function createAstElement(tag, attrs) {
    return {
      tag: tag,
      parent: null,
      children: [],
      attrs: attrs,
      type: 1,
      text: ''
    };
  }

  function start(tag, attributes) {
    // console.log('标签开始', tag, attributes)
    // 取出栈中最后一个
    var parent = stack[stack.length - 1]; // 创建ast元素

    var element = createAstElement(tag, attributes); // 如果没有根元素，那么创建出来的ast元素就是根元素

    if (!root) {
      root = element;
    }

    if (parent) {
      // 有父级元素
      parent.children.push(element);
      element.parent = parent;
    }

    stack.push(element);
  }

  function chars(text) {
    // console.log('标签文本', text)
    var parent = stack[stack.length - 1];
    text = text.replace(/\s/g, '');

    if (text) {
      parent.children.push({
        type: 3,
        text: text
      });
    }
  }

  function end(tag) {
    // console.log('标签结束', tag)
    var element = stack.pop();

    if (element.tag !== tag) {
      throw new Error('标签有误');
    }
  }

  function parserHtml(html) {
    /**
     * 用正则匹配标签开始，标签名，然后提取标签名放入容器中，然后移除掉匹配的部分 
     * 用正则匹配标签属性，然后提取属性放入容器中，然后移除掉匹配的部分
     * 用正则匹配标签结束，然后移除掉匹配的部分
     * 用正则匹配标签中的文本，然后提取文本放入容器中，然后移除掉匹配的部分
     * 用正则匹配标签结束，然后提取标签结束名和标签开始的标签名进行匹配，如果相同，说明标签相同，不相同，抛错
     */
    function advance(len) {
      html = html.substring(len);
    } // 解析开始标签


    function parseStartTag() {
      var startTag = compileTemplate.startTag(html);

      if (startTag) {
        advance(startTag[0].length);
        var match = {
          tag: startTag[1],
          attrs: []
        };

        var text, _end; // 匹配属性,只要没有到结束标签并且一直都可以匹配到属性，就一直循环


        while (!(_end = compileTemplate.tagClose(html)) && (text = compileTemplate.tagAttributes(html))) {
          match.attrs.push({
            key: text[1],
            value: text[2] || text[3] || text[4]
          });
          advance(text[0].length);
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }

      return false;
    } // 解析结束标签


    function parseEndTag() {
      var endTag = compileTemplate.closeTag(html);

      if (endTag) {
        advance(endTag[0].length);
        return endTag[1];
      }

      return false;
    }

    while (html) {
      var index = html.indexOf('<');

      if (index === 0) {
        // 不是标签开始位置就是标签结束位置
        // 解析开始标签
        var startMatch = parseStartTag();

        if (startMatch) {
          start(startMatch.tag, startMatch.attrs);
          continue;
        }

        var endMatch = parseEndTag();

        if (endMatch) {
          end(endMatch);
          continue;
        }
      } // 拿到文本的所有内容


      var text = html.slice(0, index);

      if (text) {
        chars(text);
        advance(text.length);
      }
    }

    return root;
  }

  function gen(c) {
    if (c.type === 1) {
      // 元素
      return generate(c);
    } else {
      // 文本 _v('hello')
      var text = c.text;
      var regRes = compileTemplate.qn(text); // 如果没有匹配到插值语法 hello {{name}} world  ==> 'hello' + name + 'world'

      if (!regRes) {
        return "_v('".concat(text, "')");
      } else {
        var reg = compileTemplate.qn(text, 0);
        var tokens = [];
        var lastIndex = 0;
        text.replace(reg, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (text.slice(lastIndex, args[2])) {
            tokens.push(JSON.stringify(text.slice(lastIndex, args[2])));
          }

          if (lastIndex < text.length - 1) {
            tokens.push(args[1].trim());
          }

          lastIndex = args[2] + args[0].length;
        });

        if (lastIndex < text.length) {
          if (text.slice(lastIndex)) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(root) {
    var children = root.children;

    if (children && children.length) {
      var res = children.map(function (c) {
        return gen(c);
      }).join('+');
      return res;
    }

    return false;
  }

  function genProps(props) {
    var str = '';

    for (var i = 0; i < props.length; i++) {
      var _props$i = props[i],
          key = _props$i.key,
          value = _props$i.value;

      if (key === 'style') {
        (function () {
          var styleObj = {}; // "color: red;background-color: #fff"; 转成对象

          value.replace(/([^:;]+):([^:;]+)/g, function (p, s1, s2) {
            styleObj[s1] = s2;
          });
          value = styleObj;
        })();
      }

      str += "".concat(key, ":").concat(JSON.stringify(value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function generate(root) {
    // 将ast语法树拼接成字符串

    /**
     * _c('div',{id:'root',name:'zhengchangfu'},'hello')
     * new Function + with语法
     */
    var children = genChildren(root);
    var code = "_c('".concat(root.tag, "',").concat(root.attrs.length ? genProps(root.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")"); //code ==>  _c('div',{id:"root",name:"zhengchangfu",style:{"color":" red","background-color":" #fff"}},_c('p',undefined,_c('span',undefined,_v("我叫"+name+"哈哈"))))

    return code;
  }

  function CompileToFunction(html) {
    // 将html编译成ast语法树
    var root = parserHtml(html); // 将ast语法树转换成代码

    var code = generate(root); // console.log(code, 'code')
    // 将code代码串转成函数

    var render = new Function("with(this){return ".concat(code, "}")); // console.log(render, 'render')

    /**
     * ƒ anonymous(){
        with(this){
          return _c(
            'div',
            {
              id:"root",
              name:"zhengchangfu",
              style:{
                "color":" red",
                "background-color":" #fff"
              }
            },
            _c(
              'p',
              undefined,
              _c(
                'span',
                undefined,
                _v(
                  "我叫"+name+"哈哈"
                  )
                )
              )
            )
         }
      }
     */

    return render;
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);
    };

    Vue.prototype.$mount = function (vm) {
      var el = vm.$options.el;

      if (!vm.$options.render) {
        el = document.querySelector(el);
        vm.$el = el;
        el = el.outerHTML;
        var render = CompileToFunction(el);
        vm.$options.render = render;
      } // 挂载组件


      mountComponent(vm);
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    return createVDom(vm, tag, data, data.key, children, undefined);
  }
  function createText(vm, text) {
    return createVDom(vm, undefined, undefined, undefined, undefined, text);
  }

  function createVDom(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    // 创建元素
    Vue.prototype._c = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return createElement.apply(void 0, [this].concat(args));
    }; // 创建文本


    Vue.prototype._v = function (text) {
      return createText(this, text);
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vNode = render.call(vm);
      return vNode;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
