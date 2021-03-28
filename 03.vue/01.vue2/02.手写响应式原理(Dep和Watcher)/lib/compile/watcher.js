import { pushTarget, popTarget } from "./dep"

let id = 0
class Watcher {
  /**
   * 
   * @param {*} vm Vue实例
   * @param {*} updateFnOrExpr 更新的方法或者表达式
   * @param {*} cb 自定义回调函数
   * @param {*} options 其他选项配置
   */
  constructor(vm, updateFnOrExpr, cb, options) {
    this.vm = vm
    this.id = id++ // 每个watcher都是单独的，用id来区分一下
    this.updateFnOrExpr = updateFnOrExpr
    this.cb = cb
    this.options = options
    this.deps = []
    this.depsId = new Set()
    this.get()
  }
  get () {
    pushTarget(this)
    // 这个方法会触发Object.defineProperty中的get，会去vm上面取值
    this.updateFnOrExpr()
    popTarget() // 在外面用vm上的属性是不需要收集Watcher的
  }
  // Vue中是异步更新的，主要是做一个缓存等待
  addDeps (dep) {
    const id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      // 调用dep的addSubs方法来存放watcher
      dep.addSubs(this)
    }
  }
  update () {
    this.get()
  }
}

export default Watcher