import * as Types from '../store/constants'
import store from '../store'
// 路由首位钩子
export default {
  'clear_canceltoken': (to, from, next) => {
    // 每次离开页面都清空上一个页面的所有请求
    store.commit(Types.CLEAR_CANCELTOKEN)
    next()
  },
  // 路由权限控制
  'has_permission': async (to, from, next) => {
    // 需要登录才能访问的路由
    const needLogin = to.matched.some(route => route.meta.need_login)
    // 看store中token是否存在，如果不存在，需要发送校验请求，校验token
    // 刷新vuex数据丢失
    if (!store.state.user.hasPermission) {
      // 是否登录过
      const isLogin = await store.dispatch(`user/${Types.VALIDATE}`)
      if (needLogin) {
        if (!isLogin) {
          // 需要登录但是没有登录
          next('/login')
        } else {
          // 需要登录也登录了
          next()
        }
      } else {
        // 不需要登录访问的是登录页
        if (to.path === '/login') {
          if (!isLogin) {
            // 没登录
            next()
          } else {
            next('/user')
          }
        } else {
          // 去的不是登录页
          next()
        }
      }
    } else {
      // 登陆过
      if (to.path === '/login') {
        // 访问登录页
        next('/user')
      } else {
        // 访问的不是登录页
        next()
      }
    }
  },
  // 动态路由
  'menu_permission': async (to, from, next) => {
    // 登录过但是没值
    if (store.state.user.hasPermission) {
      if (!store.state.user.hasMenuPermission) {
        await store.dispatch(`user/${Types.ADD_ROUTE}`)
        next({ ...to, replace: true }) // hack
      } else {
        next()
      }
    } else {
      next()
    }
  'has-permission': (to, from, next) => {
    // 校验权限
    /**
     * 检查是否登录过
     * 如果登录过，
     */
    next()
  }
}
