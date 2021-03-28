import { initState } from './state'
import { mountComponent } from './lifecycle'
import { CompileToFunction } from './compile/index'
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options
    initState(vm)
  }
  Vue.prototype.$mount = function (vm) {
    let el = vm.$options.el
    if (!vm.$options.render) {
      el = document.querySelector(el)
      vm.$el = el
      el = el.outerHTML
      // 将字符串编译成函数
      let render = CompileToFunction(el)
      console.log(render, 'render')
      vm.$options.render = render
    }
    // 挂载组件
    mountComponent(vm, el)
  }
}