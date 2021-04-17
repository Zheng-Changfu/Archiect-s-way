import * as Types from '../store/constants'
import store from '../store'
// 路由首位钩子
export default {
  'clear_canceltoken': (to, from, next) => {
    // 每次离开页面都清空上一个页面的所有请求
    store.commit(Types.CLEAR_CANCELTOKEN)
    next()
  }
}