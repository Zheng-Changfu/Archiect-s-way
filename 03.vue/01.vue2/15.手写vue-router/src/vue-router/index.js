import install from './install'
import createMatcher from './create-matcher'

export default class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.matcher = createMatcher(options.routes || [])
    switch (this.mode) {
      case 'history':
        this.history = new HTML5History(this)
        break;
      case 'hash':
        this.history = new HashHistory(this)
        break;
      default:
        throw new Error(`invalid mode: ${this.mode}`)
    }
  }
  /**
   * 
   * @param {*} app 组件实例
   */
  init (app) {
  }
}
VueRouter.install = install