import { pushTarget, popTarget } from "./dep"
import { queueWatcher } from './scheduler'
let id = 0
class Watcher {
  /**
   * 
   * @param {*} vm Vue实例
   * @param {*} updateFnOrExpr 更新的方法或者表达式
   * @param {*} cb 自定义回调函数
   * @param {*} options 其他选项配置
   */
  constructor(vm, updateFnOrExpr, cb, options = {}) {
    this.vm = vm
    this.id = id++ // 每个watcher都是单独的，用id来区分一下
    this.user = !!options.user // 区分是否为用户Watcher
    this.cb = cb
    this.options = options
    this.deps = []
    this.depsId = new Set()
    if (typeof updateFnOrExpr === 'string') {
      // 表示为一个表达式，因为等下要调用this.get，get方法中会调用updateFnOrExpr，所以我们这里重写updateFnOrExpr
      // 等下调用this.get会存储用户Watcher,然后调用this.updateFnOrExpr会触发我们下面的函数，然后会触发响应式中的get方法
      // 会去收集用户Watcher，然后返回vm.name的值
      // 当我们去改变name值的时候，会通知Watcher更新，我们收集新值和老值然后去调用用户回调即可
      this.updateFnOrExpr = function () {
        // return vm[updateFnOrExpr]

        // 外界可能传入这种格式,'hobby.a'(),我们需要取到a的值,就不能按照上面那种写法了
        let obj = vm
        const arr = updateFnOrExpr.split('.')
        for (let i = 0; i < arr.length; i++) {
          obj = obj[arr[i]] // {a}
        }
        return obj
      }
    } else {
      // 表示为渲染Watcher
      this.updateFnOrExpr = updateFnOrExpr
    }
    this.value = this.get()
  }
  get () {
    pushTarget(this)
    // 这个方法会触发Object.defineProperty中的get，会去vm上面取值,第一次的值就是最早的值，第二次的值就是最新的值
    const value = this.updateFnOrExpr()
    popTarget() // 在外面用vm上的属性是不需要收集Watcher的
    return value
  }
  // 存放dep,如果模板中使用了2次 {{ name }} {{ name }},他们其实用的是一个id，那么我们就不需要存放到数组中，需要进行去重
  addDeps (dep) {
    const id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      // 调用dep的addSubs方法来存放watcher
      dep.addSubs(this)
    }
  }
  // Vue中是异步更新的，主要是做一个缓存等待
  // 如果watcher的id都是一样，那么要进行去重，而且只需要更新一次即可 (防抖) ，同一个页面多个dep公共一个watcher
  // 所以Vue内部更新原理是: 去重 + 防抖
  update () {
    queueWatcher(this)
  }
  run () {
    // 更新
    const newVal = this.get()
    if (this.user) {
      const oldValue = this.value
      // 下一次的老值是这一次的新值
      this.value = newVal
      // 表示是用户watcher
      this.cb.call(this.vm, newVal, oldValue)
    }
  }
}

export default Watcher