import { initState } from './state'
import { mountComponent } from './lifecycle'
import { CompileToFunction } from './compile/index'
import { callHooks } from './lifecycle'
import { mergeOptions } from './utils'
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    // vm.$options = options
    // 将$options中的选项和Vue.options进行合并，这样的话，mixin中就可以混入数据到组件中
    vm.$options = mergeOptions(vm.constructor.options, options)
    // 初始化数据之前调用beforeCreate
    callHooks(vm, 'beforeCreate')
    initState(vm)
    // 初始化数据之后调用created
    callHooks(vm, 'created')
    // 挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options
    el = document.querySelector(el);
    vm.$el = el;
    // 把模板转化成 对应的渲染函数 =》 虚拟dom概念 vnode =》 diff算法 更新虚拟dom =》 产生真实节点，更新
    if (!options.render) { // 没有render用template，目前没render
      let template = options.template;
      if (!template && el) { // 用户也没有传递template 就取el的内容作为模板
        template = el.outerHTML;
      }
      let render = CompileToFunction(template);
      options.render = render;
    }
    // 挂载组件
    mountComponent(vm, el)
  }
}