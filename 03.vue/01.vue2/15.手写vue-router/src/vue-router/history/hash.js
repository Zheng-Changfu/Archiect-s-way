import History from './base'
function ensurehash () {
  if (!window.location.hash) {
    window.location.hash = '/'
  }
}
function gethash () {
  return window.location.hash.slice(1)
}
export default class HashHistory extends History {
  constructor(router) {
    super(router)
    ensurehash()
  }
  getCurrentLocation () {
    return gethash()
  }
  setUplisten () {
    window.addEventListener('hashchange', () => {
      // 当路径发生变化后，要跳转
      this.transtionTo(gethash())
    })
  }
}