import { patch } from './vDom/patch'
export function mountComponent (vm, el) {
  // 生成虚拟dom
  const vNode = vm._render()
  // 更新
  // vm._update(vNode)
  vm._update(vNode)
}
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this
    patch(vm.$el, vNode)
  }
}