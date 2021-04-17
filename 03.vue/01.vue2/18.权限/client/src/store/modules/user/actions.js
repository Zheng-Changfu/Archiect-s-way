import * as Types from '@/store/constants'
import { fetchLogin, fetchValidate } from '@/api/user'
export default {
  async [Types.SET_USERINFO] ({ commit }, payload) {
    const userinfo = await fetchLogin(payload)
    console.log(userinfo, 'userinfo')
    commit(Types.SET_USERINFO, userinfo)

  },
  async [Types.VALIDATE] ({ commit }) {
    const valid = await fetchValidate()
    console.log(valid, 'valid')
  }
}