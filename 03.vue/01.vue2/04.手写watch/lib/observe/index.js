import { isArray, isObject } from "../utils"
import { arrayMethods } from './array'
import Dep from "./dep"
class Observe {
  constructor(data) {
    // 只要类型是对象的都分配dep属性
    this.dep = new Dep()
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

function dependArray (value) {
  for (let i = 0; i < value.length; i++) {
    let current = value[i] // current就是嵌套的数组
    current.__ob__ && current.__ob__.dep.depend()
    if (Array.isArray(current)) {
      dependArray(current)
    }
  }
}
function defineReactive (data, key, value) {
  // 如果对象嵌套对象，继续进行递归观测
  let childOb = observe(value)
  // 每个属性都有自己的dep
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      // 先执行的是pushTarget方法存放了watcher，然后挂载组件，模板中使用了vm上的属性，会触发get，进来
      if (Dep.target) {
        dep.depend() // 存放watcher
        // console.log(value)
        // console.log(childOb)
        if (childOb) {
          // 说明数组或者对象(引用类型)中也需要收集watcher
          childOb.dep.depend()
          // 数组嵌套数组,也要考虑，因为数组嵌套数组，也会生成一个新的dep，新的dep也要去收集Watcher
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
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
  if (data.__ob__) return data.__ob__
  return new Observe(data)
}