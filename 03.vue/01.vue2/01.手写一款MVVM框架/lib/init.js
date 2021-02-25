// Vue原型上的扩展方法的工厂函数模块
import { _initState } from './state'
export const initMixin = (Vue) => {
  Vue.prototype._init = function (ops) {
    const vm = this
    vm.$options = ops
    if (vm.$options.data) {
      // 初始化状态
      _initState(vm)
    }
  }
}
