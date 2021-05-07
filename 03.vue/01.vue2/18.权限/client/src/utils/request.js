import axios from 'axios'
import Vue from 'vue';
import * as Types from '@/store/constants'
import store from '../store'
const _v = Vue.prototype
// 请求封装
class HttpRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000'
    this.timeout = 3000
    // 请求队列
    this.queue = {}
  }
  setInterceptors (url, instance) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      if (Object.keys(this.queue).length === 0) {
        // 开启loading，保证多个请求只有一个loading
        _v.$toast.setDefaultOptions({ duration: 0 });
        _v.$toast.loading({
          message: '加载中...',
          // forbidClick: true,
        });
      }
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.authorization = token
      }
      // 当我切换路由，取消上一个页面的所有请求
      let CancelToken = axios.CancelToken
      config.cancelToken = new CancelToken((c) => {
        // 将取消当前请求的函数存入vuex中，当路由切换时，依次调用即可
        store.commit(Types.CANCEL_TOKENS, c)
      })
      // 将请求放入队列中
      this.queue[url] = true
      // 返回配置
      return config
    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
      // 一旦接收到响应，把当前请求url从队列中删除
      delete this.queue[url]
      if (Object.keys(this.queue).length === 0) {
        // 取消loading
        _v.$toast.clear()
      }
      if (res.data.code === 200) {
        return res.data.data
      } else {
        // 抛出错误
        return Promise.reject(res.data)
      }
    }, err => {
      delete this.queue[url]
      if (Object.keys(this.queue).length === 0) {
        // 取消loading
        _v.$toast.clear()
      }
      // 集中错误处理

      return Promise.reject(err)
    })
  }
  request (options) {
    const instance = axios.create()
    const config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options
    }
    // 拦截器设置
    this.setInterceptors(options.url, instance)
    return instance(config) // 返回的是一个promise
  }
  get (url, data = {}) {
    return this.request({
      url,
      method: 'get',
      ...data
    })
  }
  post (url, data = {}) {
    return this.request({
      url,
      method: 'post',
      data
    })
  }
}
export default new HttpRequest