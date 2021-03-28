import { patch } from './vDom/patch'
import { nextTick } from './utils'
import Watcher from './observe/watcher'
export function mountComponent (vm, el) {
  // 挂载组件之前调用beforeMount钩子
  callHooks(vm, 'beforeMount')
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
  callHooks(vm, 'mounted')
}
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vNode) {
    const vm = this
    vm.$el = patch(vm.$el, vNode)
  }
  Vue.prototype.$nextTick = nextTick
}

// 调用指定的钩子函数
export function callHooks (vm, hook) {
  // 拿到Vue.options上经过mixin合并的hook
  // const handlers = vm.constructor.options[hook]
  // 因为我们将Vue.options和vm.$options进行了合并，让mixin中的数据可以混入到组件中，所以我们直接调用组件的$options中的钩子就行(已经被合并过了)
  const handlers = vm.$options[hook]
  // console.log(handlers, hook)
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i]
      // 钩子内部的this指向的是当前组件实例
      handler.call(vm)
    }
  }
}


