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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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
    tag: "[a-zA-Z][-0-9a-zA-Z]*",
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

  var hooks = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];
  var stracts = {};

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    stracts[hook] = mergeHook;
  } // 组件的合并策略

  /**
   * 会按照原型链的方式进行合并，如果自身上找不到，在找原型上的(Vue.component)
   */


  stracts.components = function (parentValue, childValue) {
    // options.__proto__ = parentValue
    var options = Object.create(parentValue);

    if (childValue) {
      for (var key in childValue) {
        options[key] = childValue[key];
      }
    }

    return options;
  }; // 生命周期钩子的合并策略


  function mergeHook(parentValue, childValue) {
    if (childValue) {
      if (parentValue) {
        return parentValue.concat(childValue); // 后续
      } else {
        return [childValue]; // 第一次
      }
    } else {
      return parentValue;
    }
  }

  function mergeOptions(parent, child) {
    var obj = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      mergeField(_key);
    }

    function mergeField(key) {
      /**
       * 
       * 情况:
       *  parent : {a:1} child : {a:2} ==> {a:2}
       *  parent : {a:1,data:{c:1}} child : {b:2,data:{d:2}} ==> {a:1,data:{c:1,d:2},b:2}
       *  parent : {}  child : {beforeCreated:fn} ==> {beforeCreated:[fn]}
       *  parent : {beforeCreated:[fn]} child : {beforeCreated:fn} ==> {beforeCreated:[fn1,fn2]}
       * **/
      var parentValue = parent[key];
      var childValue = child[key]; // 生命周期策略

      if (stracts[key]) {
        obj[key] = stracts[key](parentValue, childValue);
      } else {
        // 如果value是对象，暂时不考虑递归合并，浅拷贝
        // 如果value不是对象，那么以child数据为准
        if (isObject(parentValue) && isObject(childValue)) {
          obj[key] = _objectSpread2(_objectSpread2({}, parentValue), childValue);
        } else {
          // 如果子没值，就取父的值
          obj[key] = childValue || parentValue;
        }
      }
    }

    return obj;
  }
  function isReverseTag(tag) {
    // 这里我们意思一下就行
    var str = 'a,b,i,img,p,ul,li,div,button';
    return str.includes(tag);
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
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
  }
  function popTarget() {
    // Dep.target = null
    stack.pop();
    Dep.target = stack[stack.length - 1];
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
    function Watcher(vm, updateFnOrExpr, cb) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.id = id$1++; // 每个watcher都是单独的，用id来区分一下

      this.user = !!options.user; // 区分是否为用户Watcher

      this.lazy = !!options.lazy; // 区分是否为计算Watcher，默认不执行

      this.dirty = !!options.lazy; // 区分是否需要调用计算属性中的get回调

      this.cb = cb;
      this.options = options;
      this.deps = [];
      this.depsId = new Set();

      if (typeof updateFnOrExpr === 'string') {
        // 表示为一个表达式，因为等下要调用this.get，get方法中会调用updateFnOrExpr，所以我们这里重写updateFnOrExpr
        // 等下调用this.get会存储用户Watcher,然后调用this.updateFnOrExpr会触发我们下面的函数，然后会触发响应式中的get方法
        // 会去收集用户Watcher，然后返回vm.name的值
        // 当我们去改变name值的时候，会通知Watcher更新，我们收集新值和老值然后去调用用户回调即可
        this.updateFnOrExpr = function () {
          // return vm[updateFnOrExpr]
          // 外界可能传入这种格式,'hobby.a'(),我们需要取到a的值,就不能按照上面那种写法了
          var obj = vm;
          var arr = updateFnOrExpr.split('.');

          for (var i = 0; i < arr.length; i++) {
            obj = obj[arr[i]];
          }

          return obj;
        };
      } else {
        // 表示为渲染Watcher
        this.updateFnOrExpr = updateFnOrExpr;
      }

      this.value = this.lazy ? undefined : this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // 这个方法会触发Object.defineProperty中的get，会去vm上面取值,第一次的值就是最早的值，第二次的值就是最新的值

        var value = this.updateFnOrExpr();
        popTarget(); // 在外面用vm上的属性是不需要收集Watcher的

        return value;
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
        if (this.lazy) {
          this.dirty = true;
        } else {
          queueWatcher(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        // 更新
        var newVal = this.get();

        if (this.user) {
          var oldValue = this.value; // 下一次的老值是这一次的新值

          this.value = newVal; // 表示是用户watcher

          this.cb.call(this.vm, newVal, oldValue);
        }
      } // 计算属性的缓存

    }, {
      key: "computedFn",
      value: function computedFn() {
        this.dirty = false; // get函数的返回值就是外面用户在get函数中return的值

        this.value = this.get();
      }
    }, {
      key: "depend",
      value: function depend() {
        // 因为我们在计算属性中取了值，所以会去收集dep
        var i = this.deps.length;

        while (i--) {
          var dep = this.deps[i];
          dep.depend();
        }
      }
    }]);

    return Watcher;
  }();

  function stateMixin(Vue) {
    Vue.prototype.$watch = function (key, handler) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var vm = this;
      options.user = true; // 表示是一个用户Watcher

      new Watcher(vm, key, handler, options);
    };
  }
  function initState(vm) {
    if (vm.$options.data) {
      initData(vm);
    }

    if (vm.$options.watch) {
      initWatch(vm);
    }

    if (vm.$options.computed) {
      initComputed(vm);
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

  function initWatch(vm) {
    var watch = vm.$options.watch;
    Object.keys(watch).forEach(function (key) {
      var handler = watch[key]; // handler可能是数组，可能是字符串，可能是对象,可能是函数
      // 暂时没实现methods和对象,所以先不考虑这两种
      // 那就先考虑数组和函数的情况

      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          var fn = handler[i]; // 没一个函数都是一个watcher，只不过这个watcher是用户的

          createWatcher(vm, key, fn);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    });
  }

  function initComputed(vm) {
    var computed = vm.$options.computed;
    vm._computedWatchers = {};
    Object.keys(computed).forEach(function (key) {
      var value = computed[key]; // value有2种，一种是对象，一种是函数

      var getter = typeof value === 'function' ? value : value.get; // 这个getter就是用户getter
      // vm._computedWatchers用于做一个映射表，方便后面我们拿到Watcher
      // getter函数内部的this是指向vm的

      vm._computedWatchers[key] = new Watcher(vm, getter.bind(vm), function () {}, {
        lazy: true
      });
      defineComputed(vm, key, value);
    });
  }

  function createWatcher(vm, key, handler) {
    vm.$watch(key, handler);
  }
  /**
   * 
   * @param {*} key 计算属性对象中的每一个key，上面已经做了映射表
   */


  function createComputedGetter(key) {
    // 返回后的get回调
    return function () {
      // 这里的this是vm调用的，因为我们定义了Object.defineProperty,第一个参数是vm
      // 因为我们的getter函数也被存到了Watcher中，所以我们需要拿到Watcher然后在特定时机调用即可
      var watcher = this._computedWatchers[key]; // 计算属性的缓存

      if (watcher.dirty) {
        // 说明是脏的，需要调用用户的回调
        watcher.computedFn();
      } // 此时的计算Watcher已经覆盖了渲染Watcher,栈中存放了2个Watcher，一个计算，一个渲染


      if (Dep.target) {
        // 向上收集渲染Watcher
        // 找到相关依赖dep
        watcher.depend();
      }

      return watcher.value;
    };
  }

  function defineComputed(vm, key, value) {
    var shareComputed = {};

    if (typeof value === 'function') {
      // 因为计算属性具有缓存功能，所以我们这里用高阶函数返回一个getter，getter是否能被调用取决于dirty属性
      shareComputed.get = createComputedGetter(key);
    } else {
      shareComputed.get = createComputedGetter(key);
      shareComputed.set = value.set;
    } // 把key定义到vm上面，用于渲染模板


    Object.defineProperty(vm, key, shareComputed);
  }

  function patch(oldVnode, vNode) {
    if (!oldVnode) {
      return createEl(vNode);
    }

    var parent = oldVnode.parentNode;

    if (parent && parent.nodeType === 1) {
      // 真实元素
      var elm = createEl(vNode);
      parent.insertBefore(elm, oldVnode.nextSibling);
      parent.removeChild(oldVnode);
      return elm;
    } else {
      debugger; // diff算法比较
      // console.log(oldVnode, vNode)
      // 第一种，如果标签名不一样，直接新的覆盖老的

      if (oldVnode.tag !== vNode.tag) {
        return oldVnode.el.parentNode.replaceChild(createEl(vNode), oldVnode.el);
      }

      var el = oldVnode.el; // if (oldVnode.text === vNode.text) {
      // }
      // 比对属性

      patchProps(el, oldVnode, vNode);
    }
  }

  function patchProps(el, oldVnode, vNode) {
    // 如果旧虚拟dom上面没有属性，新的上面有，那就应该遍历新的，看新的属性在旧虚拟dom上有没有，如果没有，就添加属性
    for (var key in vNode.props) {
      var newValue = vNode.props[key]; // 如果新的属性在老的上面没有

      if (!oldVnode.props[newValue]) {
        // 设置属性
        el.setAttribute(key, newValue);
      }
    }
  }

  function createComponent(vNode) {
    var i = vNode.data;

    if ((i = i.hook) && (i = i.init)) {
      // 调用vNode.data.hook.init
      i(vNode);
    }

    if (vNode.componentInstance) {
      // 有属性说明子组件new完毕了，并且组件对应的真实DOM挂载到了componentInstance.$el
      return true;
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

    if (typeof tag === 'string') {
      if (createComponent(vNode)) {
        // 返回组件对应的真实节点
        return vNode.componentInstance.$el;
      } // 标签


      elm = vNode.el = document.createElement(tag); // 虚拟节点上面都有一个el属性，对应真实元素，在做diff算法比较的时候有用

      if (children && children.length) {
        for (var i = 0; i < children.length; i++) {
          var item = children[i];
          elm.appendChild(createEl(item));
        }
      }
    } else {
      // 文本
      elm = vNode.el = document.createTextNode(text);
    }

    return elm;
  }

  function mountComponent(vm, el) {
    // 挂载组件之前调用beforeMount钩子
    callHooks(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      // 生成虚拟dom
      var vNode = vm._render(); // 更新


      vm._update(vNode);
    }; // updateComponent() ==> 更新组件
    // 这里渲染的时候我们创建一个Watcher，在Watcher中更新组件


    new Watcher(vm, updateComponent, function () {
      console.log('update view');
    }, true); // true代表是一个渲染Watcher

    callHooks(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vNode) {
      var vm = this;
      vm.$el = patch(vm.$el, vNode);
    };

    Vue.prototype.$nextTick = nextTick;
  } // 调用指定的钩子函数

  function callHooks(vm, hook) {
    // 拿到Vue.options上经过mixin合并的hook
    // const handlers = vm.constructor.options[hook]
    // 因为我们将Vue.options和vm.$options进行了合并，让mixin中的数据可以混入到组件中，所以我们直接调用组件的$options中的钩子就行(已经被合并过了)
    var handlers = vm.$options[hook]; // console.log(handlers, hook)

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        var handler = handlers[i]; // 钩子内部的this指向的是当前组件实例

        handler.call(vm);
      }
    }
  }

  function parserHtml(html) {
    debugger;
    /**
     * 用正则匹配标签开始，标签名，然后提取标签名放入容器中，然后移除掉匹配的部分 
     * 用正则匹配标签属性，然后提取属性放入容器中，然后移除掉匹配的部分
     * 用正则匹配标签结束，然后移除掉匹配的部分
     * 用正则匹配标签中的文本，然后提取文本放入容器中，然后移除掉匹配的部分
     * 用正则匹配标签结束，然后提取标签结束名和标签开始的标签名进行匹配，如果相同，说明标签相同，不相同，抛错
     */
    // 树根

    var root = null;

    function advance(len) {
      html = html.substring(len);
    } // 栈


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
      var vm = this; // vm.$options = options
      // 将$options中的选项和Vue.options进行合并，这样的话，mixin中就可以混入数据到组件中

      vm.$options = mergeOptions(vm.constructor.options, options); // 初始化数据之前调用beforeCreate

      callHooks(vm, 'beforeCreate');
      initState(vm); // 初始化数据之后调用created

      callHooks(vm, 'created'); // 挂载

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el; // 把模板转化成 对应的渲染函数 =》 虚拟dom概念 vnode =》 diff算法 更新虚拟dom =》 产生真实节点，更新

      if (!options.render) {
        // 没有render用template，目前没render
        var template = options.template;

        if (!template && el) {
          // 用户也没有传递template 就取el的内容作为模板
          template = el.outerHTML;
        }

        var render = CompileToFunction(template);
        options.render = render;
      } // 挂载组件


      mountComponent(vm);
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    // 判断是否为原生标签，如果是原生标签，就渲染原生的虚拟节点
    // 反之，渲染组件的虚拟节点
    if (isReverseTag(tag)) {
      return createVDom(vm, tag, data, data.key, children, undefined);
    } else {
      // 说明是组件，应该返回组件的虚拟节点
      var Ctor = vm.$options.components[tag];
      return createComponent$1(vm, tag, data, data.key, children, Ctor);
    }
  }

  function createComponent$1(vm, tag, data, key, children, Ctor) {
    if (isObject(Ctor)) {
      // 外面在new Vue中传入的components也会被extend，等同于Vue.component()
      Ctor = vm.$options._base.extend(Ctor);
    }

    data.hook = {
      init: function init(vNode) {
        // 调用子组件
        if (Ctor) {
          var _vm = vNode.componentInstance = new Ctor({
            isComponent: true
          });

          _vm.$mount();
        }
      }
    }; // 组件的虚拟节点
    // console.log(createVDom(vm, `vue-componnet-${tag}`, data, key, undefined, undefined, { Ctor, children }))

    return createVDom(vm, "vue-componnet-".concat(tag), data, key, undefined, undefined, {
      Ctor: Ctor,
      children: children
    });
  }

  function createText(vm, text) {
    return createVDom(vm, undefined, undefined, undefined, undefined, text);
  }

  function createVDom(vm, tag, data, key, children, text, componentOptions) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text,
      componentOptions: componentOptions
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

  /**
   * Vue的全局方法模块
   */
  function globalMixin(Vue) {
    Vue.options = {};

    Vue.mixin = function (options) {
      // 每次调用mixin方法都会进行合并，然后记录下来，放到Vue.options属性上
      this.options = mergeOptions(this.options, options);
    }; // 为了让以后所有的组件都可以拿到这个属性


    Vue.options._base = Vue; // 用component方法注册的组件会被放到这里

    Vue.options.components = {};

    Vue.component = function (id, options) {
      options = this.options._base.extend(options);
      this.options.components[id] = options;
    };

    Vue.extend = function (options) {
      var Super = this;

      var Sub = function VueComponent(options) {
        this._init(options);
      }; // 继承
      // 相当于Sub.prototype.__proto__ = Super.prototype


      Sub.prototype = Object.create(Super.prototype); // 修正此继承bug

      Sub.prototype.constructor = Sub; // 合并,每个组件都有一个自己的options选项，options选项会和Vue.options选项进行合并操作

      Sub.options = mergeOptions(Super.options, options);
      return Sub;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);
  stateMixin(Vue);
  globalMixin(Vue);
  // let oldTemplate = `<p>{{message}}</p>`
  // 第二种:如果没有标签，文本不一样，直接替换文本

  var oldTemplate = "<div>1</div>";
  var render1 = CompileToFunction(oldTemplate);
  var vm1 = new Vue({
    data: {
      message: 1
    }
  });
  var oldNode = render1.call(vm1);
  document.body.appendChild(createEl(oldNode)); // 第一种:如果标签不一样，直接用新的标签替换掉老的标签
  // let newTemplate = `<div>{{message}}</div>`
  // 第二种:如果没有标签，文本不一样，直接替换文本

  var newTemplate = "<div a=b>2</div>";
  var render2 = CompileToFunction(newTemplate);
  var vm2 = new Vue({
    data: {
      message: 2
    }
  });
  var newNode = render2.call(vm2);
  setTimeout(function () {
    patch(oldNode, newNode);
  }, 2000);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
