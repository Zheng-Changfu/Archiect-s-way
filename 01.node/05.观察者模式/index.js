/**
 * 什么是观察者模式？
 *    观察者模式一般分为二种
 *        1. 观察者(内部会有一个方法，一旦被观察者状态发生变化，这个方法会被调用，然后传入被观察者的最新状态)
 *        2. 被观察者(内部应该装载着观察者，一旦自己状态改变，应该通知观察者去更新)
 */

// 被观察者
class Observed {
  constructor(name) {
    this.name = name
    this.status = '难过'
    this.arr = [] // 装载容器
  }
  // 装载函数
  attach (observer) {
    this.arr.push(observer)
  }
  // 改变状态的函数
  setState (newStatus) {
    // 记录旧状态
    const oldVal = this.status
    // 改变状态,生成新状态
    const newVal = this.status = newStatus
    // 通知观察者更新
    this.arr.forEach(fn => fn.upload(oldVal, newVal, this.name))
  }
}
// 观察者
class Observer {
  constructor(name) {
    this.name = name
  }
  upload (oldVal, newVal, name) {
    console.log(`${name}之前${oldVal},${this.name}知道了~~`)
    console.log(`${name}现在${newVal},${this.name}知道了~~`)
  }
}
const observed = new Observed('宝宝')
const observer1 = new Observer('爸爸')
const observer2 = new Observer('妈妈')
// 装载观察者
observed.attach(observer1)
observed.attach(observer2)
// 更新宝宝的状态
observed.setState('开心')
setTimeout(() => {
  observed.setState('睡着了')
}, 2000)