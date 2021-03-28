import { isArray, isObject } from "../utils"
import { arrayMethods } from './array'
import Dep from "../compile/dep"
class Observe {
  constructor(data) {

    // 响应式属性里都会有一个__ob__属性
    // data.__ob__ = this // 这么写会导致爆栈，因为一直在调用walk方法，然后一直在循环调用new Observe
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false // 不可被枚举(遍历)
    })
    // 如果数据为一个数组，那么也会进来，此时我们要改写数组中的方法
    if (isArray(data)) {
      // 改写数组的方法
      data.__proto__ = arrayMethods
      this.observeArray(data) // 对数组中是对象的定义成响应式
    } else {
      this.walk(data)
    }
  }
  observeArray (data) {
    data.forEach(item => {
      observe(item)
    })
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      const value = data[key]
      defineReactive(data, key, value)
    })
  }
}
function defineReactive (data, key, value) {
  // 如果对象嵌套对象，继续进行递归观测
  observe(value)
  // 每个属性都有自己的dep
  
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      // 先执行的是pushTarget方法存放了watcher，然后挂载组件，模板中使用了vm上的属性，会触发get，进来
      if (Dep.target) {
        dep.depend() // 存放watcher
      }
      return value
    },
    set (newVal) {
      if (value !== newVal) {
        // 如果用户新赋值一个对象，那么新对象也要进行观测
        observe(newVal)
        value = newVal
        // 通知watcher去更新
        dep.notify()
      }
    }
  })
}

export function observe (data) {
  if (!isObject(data)) return
  if (data.__ob__) return
  return new Observe(data)
}