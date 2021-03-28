/**
 * Vue的全局方法模块
 */
import { mergeOptions } from '../utils'
export function globalMixin (Vue) {
  Vue.options = {}
  Vue.mixin = function (options) {
    // 每次调用mixin方法都会进行合并，然后记录下来，放到Vue.options属性上
    this.options = mergeOptions(this.options, options)
  }
  // 为了让以后所有的组件都可以拿到这个属性
  Vue.options._base = Vue
  // 用component方法注册的组件会被放到这里
  Vue.options.components = {}
  Vue.component = function (id, options) {
    options = this.options._base.extend(options)
    this.options.components[id] = options
  }
  Vue.extend = function (options) {
    const Super = this
    let Sub = function VueComponent (options) {
      this._init(options)
    }
    // 继承
    // 相当于Sub.prototype.__proto__ = Super.prototype
    Sub.prototype = Object.create(Super.prototype)
    // 修正此继承bug
    Sub.prototype.constructor = Sub
    // 合并,每个组件都有一个自己的options选项，options选项会和Vue.options选项进行合并操作
    Sub.options = mergeOptions(Super.options, options)
    return Sub
  }
}