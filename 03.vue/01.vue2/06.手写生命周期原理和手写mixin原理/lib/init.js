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
      vm.$mount(vm)
    }
  }
  Vue.prototype.$mount = function (vm) {
    let el = vm.$options.el
    if (!vm.$options.render) {
      el = document.querySelector(el)
      vm.$el = el
      el = el.outerHTML
      let render = CompileToFunction(el)
      vm.$options.render = render
    }
    // 挂载组件
    mountComponent(vm, el)
  }
}