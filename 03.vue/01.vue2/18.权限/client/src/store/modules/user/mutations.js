import * as Types from '@/store/constants'
export default {
  [Types.SET_USERINFO] (state, payload) {
    const { token, menulist, router, username } = payload
    state.token = token
    state.menulist = router
    state.btnlist = menulist
    state.username = username
  }
}