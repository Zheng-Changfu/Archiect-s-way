import { _Vue } from './install'
import { forEachValue } from './utils'
import ModuleCollection from './module/module-collection'
export default class Store {
  constructor(options) {
    // 格式化模块
    this._modules = new ModuleCollection(options)
    this.wrapperGetters = {}
    this.getters = {}
    this.mutations = {}
    this.actions = {}
    const computed = {}
    const state = options.state

    // 安装模块
    installModule(this, state, [], this._modules.root)
    forEachValue(this.wrapperGetters, (getter, key) => {
      computed[key] = getter
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })
    // 基于vue的响应式系统
    this._vm = new _Vue({
      data: {
        $$state: state
      },
      computed
    })
  }
  get state () {
    return this._vm._data.$$state
  }
  commit (type, payload) {
    this.mutations[type] && this.mutations[type].forEach(mutation => mutation(payload))
  }
  dispatch () {
    this.actions[type] && this.actions[type].forEach(action => action(payload))
  }
}

function installModule (store, state, path, module) {

  const ns = store._modules.getNameSpace(path)

  // 子模块状态要安装到对应的父级模块中
  if (path.length > 0) { // [a]
    let newState = path.slice(0, -1).reduce((p, c) => {
      return p[c]
    }, state)
    newState[path[path.length - 1]] = module.state
  }

  module.forEachGetters((fn, key) => {
    key = ns + key
    store.wrapperGetters[key] = function () {
      // 用户getter函数绑定this指向实例，传入模块状态
      return fn.call(store, module.state)
    }
  })

  module.forEachMutaions((fn, key) => {
    key = ns + key
    // mutations和actions会被合并成数组，依次调用
    store.mutations[key] = store.mutations[key] || []
    store.mutations[key].push((payload) => {
      return fn.call(store, module.state, payload)
    })
  })

  module.forEachActions((fn, key) => {
    key = ns + key
    store.actions[key] = store.actions[key] || []
    store.actions[key].push((payload) => {
      return fn.call(store, store, payload)
    })
  })

  module.forEachChild((childModule, childKey) => {
    return installModule(store, state, path.concat(childKey), childModule)
  })
}