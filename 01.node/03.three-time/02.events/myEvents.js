// { eventName1: [fn1, fn2] }
class Events {
  constructor() {
    this.events = {}
  }
  on (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName] = [...this.events[eventName], callback]
    }
  }
  emit (eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(...args))
    }
  }
  once (eventName, callback) {
    // 绑定之后被触发一次就解绑
    const fn = (...args) => {
      callback(...args)
      this.off(eventName, fn)
    }
    this.on(eventName, fn)
  }
  off (eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(fn => { return fn !== callback })
    }
  }
}
module.exports = Events
