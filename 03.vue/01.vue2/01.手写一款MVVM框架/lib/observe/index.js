import { typeofFn } from "../utils"
// 劫持函数
const observe = (data) => {
  // 如果data是一个对象，才劫持
  if (!(typeofFn('isObject')(data))) {
    return
  }
  // 定义响应式
  return new Observe(data)
}

// 观察者
class Observe {
  constructor(data) {
    this.walk(data)
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      const value = data[key]
      defineReactive(data, key, value)
    })
  }
}
// 定义响应式函数
const defineReactive = (data, key, value) => {
  // 如果value还是一个对象，需要递归处理
  if (typeofFn('isObject')(value)) {
    observe(value)
  }
  Object.defineProperty(data, key, {
    get () {
      return value
    },
    set (newVal) {
      // 如果用户在外面手动对data中的数据进行赋值并且要是一个对象，要对赋值后的数据再次进行劫持
      observe(newVal)
      value = newVal
    }
  })
}

export default observe