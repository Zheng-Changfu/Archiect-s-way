import { forEachValue } from "../utils"
import Module from './module'
// 格式化模块
export default class ModuleCollection {
  constructor(options) {
    this.root = null
    this.register([], options)
  }

  getNameSpace (path) {
    let module = this.root
    return path.reduce((p, c) => {
      module = module.getChild(c)
      return module.namespaced ? p + c + '/' : p
    }, '')
  }

  /**
   * 
   * @param {*} path 区分父子关系
   * @param {*} options 模块
   */
  register (path, module) {
    let newModule = new Module({
      _raw: module, // 当前模块
      state: module.state, // 当前模块的状态
      _children: {} // 当前模块的子模块集合
    })
    if (path.length === 0) {
      // 根模块
      this.root = newModule
    } else {
      // 子模块
      // 找到父级模块
      // 比如[a,c] 注册c模块的时候应该插入到a里面
      // 递归回去的时候会把路径重置
      let parent = path.slice(0, -1).reduce((p, c) => {
        return p.getChild(c)
      }, this.root)
      parent._children[path[path.length - 1]] = newModule
    }

    if (module.modules) {
      // 递归注册模块
      forEachValue(module.modules, (module, key) => {
        this.register(path.concat(key), module)
      })
    }
  }
}
