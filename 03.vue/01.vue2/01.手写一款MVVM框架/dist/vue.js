(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  // 工具函数汇总
  // 检测数据类型
  var typeofFn = function typeofFn(fnName) {
    // 生成函数
    return function (data) {
      return Object.prototype.toString.call(data).slice(8, -1) === fnName.slice(2);
    };
  };

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

  var observe = function observe(data) {
    // 如果data是一个对象，才劫持
    if (!typeofFn('isObject')(data)) {
      return;
    } // 定义响应式


    return new Observe(data);
  }; // 观察者


  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);

      this.walk(data);
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          var value = data[key];
          defineReactive(data, key, value);
        });
      }
    }]);

    return Observe;
  }(); // 定义响应式函数


  var defineReactive = function defineReactive(data, key, value) {
    // 如果value还是一个对象，需要递归处理
    if (typeofFn('isObject')(value)) {
      observe(value);
    }

    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newVal) {
        // 如果用户在外面手动对data中的数据进行赋值并且要是一个对象，要对赋值后的数据再次进行劫持
        observe(newVal);
        value = newVal;
      }
    });
  };

  // 状态初始化
  var _initState = function _initState(vm) {
    var options = vm.$options;

    if (options.data) {
      initData(vm);
    }

    if (options.computed) ;

    if (options.watch) ;
  };

  var initData = function initData(vm) {
    var data = vm.$options.data; // 判断data是一个函数还是一个对象,data中的this指向实例
    // 通过vm._data 将响应式属性和vm进行关联

    data = vm._data = typeofFn('isFunction')(data) ? data.call(vm) : data; // 观测对象(劫持)

    observe(data);
  };

  // Vue原型上的扩展方法的工厂函数模块
  var initMixin = function initMixin(Vue) {
    Vue.prototype._init = function (ops) {
      var vm = this;
      vm.$options = ops;

      if (vm.$options.data) {
        // 初始化状态
        _initState(vm);
      }
    };
  };

  // Vue的入口

  function Vue(ops) {
    // 用户传入的配置项
    this._init(ops);
  } // Vue原型的方法我们使用注入的方式来进行扩展


  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
