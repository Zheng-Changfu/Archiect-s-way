const oldArrayProto = Array.prototype
export const arrayMethods = Object.create(oldArrayProto)
let methods = [
  'shift',
  'unshift',
  'sort',
  'pop',
  'splice',
  'push',
  'reverse'
]

methods.forEach(method => {
  // 对数组方法进行重写
  arrayMethods[method] = function (...args) {
    oldArrayProto[method].call(this, ...args)
    let ob = this.__ob__ // 拿到Observe实例

    // 如果方法是新增属性的，那么我们要对新增的属性再次进行响应式处理
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break;
      case 'splice':
        inserted = args.slice(2)
        break;
      default:
        break;
    }

    if (inserted) {
      // 说明调用了push/unshift/splice等方法
      // 将新增的数据定义成响应式
      ob.observeArray(inserted)
    }
    // 调用了数组的变异方法，就要通知watcher进行更新
    ob.dep.notify()
  }
})
