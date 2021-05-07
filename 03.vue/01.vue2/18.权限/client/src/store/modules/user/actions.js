import * as Types from '@/store/constants'
import authlist from '@/router/permissions'
import router from '@/router'
import filterRoute from '@/utils/filterRoute'
import createMatcher from '@/utils/createMatcher'
import { fetchLogin, fetchValidate } from '@/api/user'
export default {
<<<<<<< HEAD
  async [Types.SET_USER] ({ commit }, { userinfo, has }) {
    commit(Types.SET_USERINFO, userinfo)
    commit(Types.SET_PERMISSION, has)
  },
  async [Types.SET_LOGIN] ({ dispatch }, payload) {
    const userinfo = await fetchLogin(payload)
    dispatch(Types.SET_USER, { userinfo, has: true })
  },
  async [Types.VALIDATE] ({ commit, dispatch }) {
    // 判断是否登录过
    if (!localStorage.getItem('token')) return false
    // 发送请求，校验token
    try {
      // 请求头中添加authorization字段
      const userinfo = await fetchValidate()
      dispatch(Types.SET_USER, { userinfo, has: true })
      return true
    } catch (error) {
      // 校验失败
      dispatch(Types.SET_USER, { userinfo: {}, has: false })
      return false
    }
=======
  async [Types.SET_USERINFO] ({ commit }, payload) {
    const _v = this._vm
    try {
      const userinfo = await fetchLogin(payload)
      commit(Types.SET_USERINFO, userinfo)
      _v.$toast.fail('登录成功')
      console.log(22222)
      // 成功跳转个人中心页 ,动态添加路由，动态设置按钮权限
      // _v.$router.push('/user')
    } catch (error) {
      _v.$toast.fail('登录失败')
    } finally {
      _v.$toast.clear()
    }

>>>>>>> 3dd732ed07879ec04d035d81c0b614cb37303250
  },
  async [Types.ADD_ROUTE] ({ commit, state }) {
    // 后台返回的菜单权限
    let menulist = state.menulist
    // 将菜单权限扁平化
    menulist = createMatcher(menulist)
    // 找到匹配项的路由
    const routes = filterRoute(menulist, authlist)
    console.log(menulist)
    // 在user路由中添加子路由
    const parent = router.options.routes.find(route => route.path === '/user')
    parent.children = routes
    router.addRoute(parent)
    // router.addRoutes([parent])
    commit(Types.SET_MENUPERMISSION, true)
  }
}