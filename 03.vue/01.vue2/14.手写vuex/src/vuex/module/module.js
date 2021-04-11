import { forEachValue } from '../utils'
export default class Module {
  constructor({ _raw, state, _children }) {
    this._raw = _raw
    this.state = state
    this._children = _children
  }
  get namespaced () {
    return !!this._raw.namespaced
  }
  getChild (name) {
    return this._children[name]
  }
  forEachGetters (cb) {
    this._raw.getters && forEachValue(this._raw.getters, cb)
  }
  forEachMutaions (cb) {
    this._raw.mutations && forEachValue(this._raw.mutations, cb)
  }
  forEachActions (cb) {
    this._raw.actions && forEachValue(this._raw.actions, cb)
  }
  forEachChild (cb) {
    this._children && forEachValue(this._children, cb)
  }

}