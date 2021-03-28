
import { createElement, createText } from './vDom/index'
export function renderMixin (Vue) {
  // 创建元素
  Vue.prototype._c = function (...args) {
    return createElement(this, ...args)
  }
  // 创建文本
  Vue.prototype._v = function (text) {
    return createText(this, text)
  }
  Vue.prototype._render = function () {
    const vm = this
    const render = vm.$options.render
    let vNode = render.call(vm)
    console.log(vNode)
    return vNode
  }
}