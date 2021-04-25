import * as Types from '@/store/constants'
import { fetchLogin, fetchValidate } from '@/api/user'
export default {
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

  },
  async [Types.VALIDATE] ({ commit }) {
    const valid = await fetchValidate()
    console.log(valid, 'valid')
  }
}