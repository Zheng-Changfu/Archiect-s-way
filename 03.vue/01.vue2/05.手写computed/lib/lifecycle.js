import { patch } from './vDom/patch'
import {nextTick} from './utils'
import Watcher from './observe/watcher'
export function mountComponent (vm, el) {
  const updateComponent = () => {
    // 生成虚拟dom
    const vNode = vm._render()
    // 更新
    vm._update(vNode)
  }
  // updateComponent() ==> 更新组件
  // 这里渲染的时候我们创建一个Watcher，在Watcher中更新组件
  new Watcher(vm, updateComponent, () => {
    console.log('update view')
  }, true) // true代表是一个渲染Watcher
}
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this
    vm.$el = patch(vm.$el, vNode)
  }
  Vue.prototype.$nextTick = nextTick
}