import { _Vue } from './install'
import { forEachValue } from './utils'
export default class Store {
  constructor(options) {
    const { state, actions, mutations, getters } = options
    const computed = {}
    this.mutations = {}
    this.actions = {}
    // 防止隐式丢失this
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
    this.getters = {}

    forEachValue(getters, (fn, key) => {
      computed[key] = () => fn.call(this, state)
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })

    forEachValue(actions, (fn, key) => {
      this.actions[key] = (payload) => fn.call(this, this, payload)
    })

    forEachValue(mutations, (fn, key) => {
      this.mutations[key] = (payload) => fn.call(this, this.state, payload)
    })
    // 依赖Vue的响应式原理
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
    this.mutations[type](payload)
  }
  dispatch (type, payload) {
    this.actions[type](payload)
  }
}