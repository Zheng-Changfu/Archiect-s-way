// 状态初始化
import { typeofFn } from './utils'
import observe from './observe/index'
export const _initState = (vm) => {
  let options = vm.$options
  if (options.data) {
    initData(vm)
  }

  if (options.computed) {

  }

  if (options.watch) {

  }
}
const initData = (vm) => {
  let data = vm.$options.data
  // 判断data是一个函数还是一个对象,data中的this指向实例
  // 通过vm._data 将响应式属性和vm进行关联
  data = vm._data = typeofFn('isFunction')(data) ? data.call(vm) : data
  // 观测对象(劫持)
  observe(data)
}