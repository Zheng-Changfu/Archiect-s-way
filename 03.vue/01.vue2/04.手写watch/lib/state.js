import { observe } from './observe/index'
import { isFunction } from './utils'
import Watcher from './observe/watcher'
export function stateMixin (Vue) {
  Vue.prototype.$watch = function (key, handler, options = {}) {
    const vm = this
    options.user = true // 表示是一个用户Watcher
    new Watcher(vm, key, handler, options)
  }
}
export function initState (vm) {
  if (vm.$options.data) {
    initData(vm)
  }
  if (vm.$options.watch) {
    initWatch(vm)
  }
  if (vm.computed) {
    initComputed(vm)
  }
  // 挂载
  if (vm.$options.el) {
    vm.$mount(vm)
  }
}
function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key]
    },
    set (newVal) {
      vm[source][key] = newVal
    }
  })
}
function initData (vm) {
  let data = vm.$options.data
  data = vm._data = isFunction(data) ? data.call(vm) : data
  // 所有的数据现在都在_data中，那么我们做一层数据代理，外界访问vm.xxx的时候我们去vm._data中读取xxx
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function initWatch (vm) {
  const watch = vm.$options.watch
  Object.keys(watch).forEach(key => {
    const handler = watch[key]
    // handler可能是数组，可能是字符串，可能是对象,可能是函数
    // 暂时没实现methods和对象,所以先不考虑这两种
    // 那就先考虑数组和函数的情况
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        const fn = handler[i]
        // 没一个函数都是一个watcher，只不过这个watcher是用户的
        createWatcher(vm, key, fn)
      }
    } else {
      createWatcher(vm, key, handler)
    }
  })
}

function createWatcher (vm, key, handler) {
  vm.$watch(key, handler)
}
