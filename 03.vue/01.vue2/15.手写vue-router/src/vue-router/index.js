import install from './install'
import createMatcher from './create-matcher';
import HTML5History from './history/html5'
import HashHistory from './history/hash'
export default class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    console.log(options.routes, '原来的')
    // 扁平化数据
    // matcher上面有match方法和addRoutes方法
    this.matcher = createMatcher(options.routes || [])
    switch (this.mode) {
      case 'history':
        this.history = new HTML5History(this)
        break;
      case 'hash':
        this.history = new HashHistory(this)
        break;
      default:
        console.error(`invalid mode: ${this.mode}`)
        break;
    }
  }
  init (app) {
    // 默认要跳转
    const history = this.history
    // 根据模式不同，要调用不同的方法
    const setUpListen = () => {
      history.setUplisten()
    }
    history.transtionTo(history.getCurrentLocation(), setUpListen)
    history.listen((route) => {
      app._route = route
    })
  }
  match (path) {
    return this.matcher.match(path)
  }
  push (path) {
    this.history.transtionTo(path, () => {
      window.location.hash = path
    })
  }
}
VueRouter.install = install