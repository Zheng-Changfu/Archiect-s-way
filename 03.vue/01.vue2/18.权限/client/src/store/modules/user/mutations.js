import * as Types from '@/store/constants'
export default {
  [Types.SET_USERINFO] (state, payload) {
    const { token, menulist, router, username } = payload
    state.token = token
    state.menulist = router
    state.btnlist = menulist
    state.username = username
    // 存储token
    if (token) {
      localStorage.setItem('token', token)
    }
  },
  [Types.SET_PERMISSION] (state, payload) {
    state.hasPermission = payload
  },
  [Types.VALIDATE] (state, payload) {
    // 判断token是否存在
    if (!state.hasPermission) return false
  },
  [Types.SET_MENUPERMISSION] (state, payload) {
    state.hasMenuPermission = payload
  }
}