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
}