import { isReverseTag, isObject } from '../utils'
export function createElement (vm, tag, data = {}, ...children) {
  // 判断是否为原生标签，如果是原生标签，就渲染原生的虚拟节点
  // 反之，渲染组件的虚拟节点
  if (isReverseTag(tag)) {
    return createVDom(vm, tag, data, data.key, children, undefined)
  } else {
    // 说明是组件，应该返回组件的虚拟节点
    const Ctor = vm.$options.components[tag]
    return createComponent(vm, tag, data, data.key, children, Ctor)
  }
}

function createComponent (vm, tag, data, key, children, Ctor) {
  if (isObject(Ctor)) {
    // 外面在new Vue中传入的components也会被extend，等同于Vue.component()
    Ctor = vm.$options._base.extend(Ctor)
  }
  data.hook = {
    init (vNode) {
      // 调用子组件
      if (Ctor) {
        let vm = vNode.componentInstance = new Ctor({ isComponent: true })
        vm.$mount()
      }
    }
  }
  // 组件的虚拟节点
  // console.log(createVDom(vm, `vue-componnet-${tag}`, data, key, undefined, undefined, { Ctor, children }))
  return createVDom(vm, `vue-componnet-${tag}`, data, key, undefined, undefined, { Ctor, children })
}

export function createText (vm, text) {
  return createVDom(vm, undefined, undefined, undefined, undefined, text)
}
function createVDom (vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  }
}