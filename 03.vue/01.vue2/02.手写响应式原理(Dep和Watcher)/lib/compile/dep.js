let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  depend () {
    if (Dep.target) {
      // Dep.target就是watcher
      Dep.target.addDeps(this) // this是当前实例dep
    }
  }
  addSubs (watcher) {
    this.subs.push(watcher)
  }
  notify () {
    this.subs.forEach(watcher => watcher.update())
  }
}

Dep.target = null

export function pushTarget (watcher) {
  Dep.target = watcher
}
export function popTarget () {
  Dep.target = null
}
export default Dep
