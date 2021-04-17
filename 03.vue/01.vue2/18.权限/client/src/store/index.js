import Vue from 'vue'
import Vuex from 'vuex'
import * as Types from './constants'
import modules from './modules'
Vue.use(Vuex)
// 动态注入vuex
export default new Vuex.Store({
  state: {
    // 取消请求的函数
    cancelTokens: []
  },
  mutations: {
    [Types.CANCEL_TOKENS] (state, payload) {
      state.cancelTokens = [...state.cancelTokens, payload]
    },
    [Types.CLEAR_CANCELTOKEN] (state) {
      // 取出钩子一个个执行
      state.cancelTokens.forEach(c => c())
      // 清空
      state.cancelTokens = []
    }
  },
  actions: {
  },
  modules: {
    ...modules
  }
})
