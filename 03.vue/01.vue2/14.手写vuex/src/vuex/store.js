import { _Vue } from './install'
import { forEachValue } from './utils'
import ModuleCollection from './module/module-collection'
export default class Store {
  constructor(options) {
    // 格式化模块
    this._modules = new ModuleCollection(options)
  }
}