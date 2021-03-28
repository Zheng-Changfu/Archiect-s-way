import { observe } from './observe/index'
import { isFunction } from './utils'
import Watcher from './observe/watcher'
import Dep from './observe/dep'
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
  if (vm.$options.computed) {
    initComputed(vm)
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
function initComputed (vm) {
  const computed = vm.$options.computed
  vm._computedWatchers = {}
  Object.keys(computed).forEach(key => {
    const value = computed[key]
    // value有2种，一种是对象，一种是函数
    let getter = typeof value === 'function' ? value : value.get
    // 这个getter就是用户getter
    // vm._computedWatchers用于做一个映射表，方便后面我们拿到Watcher
    // getter函数内部的this是指向vm的
    vm._computedWatchers[key] = new Watcher(vm, getter.bind(vm), () => { }, { lazy: true })
    defineComputed(vm, key, value)
  })
}

function createWatcher (vm, key, handler) {
  vm.$watch(key, handler)
}
/**
 * 
 * @param {*} key 计算属性对象中的每一个key，上面已经做了映射表
 */
function createComputedGetter (key) {
  // 返回后的get回调
  return function () {
    // 这里的this是vm调用的，因为我们定义了Object.defineProperty,第一个参数是vm
    // 因为我们的getter函数也被存到了Watcher中，所以我们需要拿到Watcher然后在特定时机调用即可
    const watcher = this._computedWatchers[key]
    // 计算属性的缓存
    if (watcher.dirty) {
      // 说明是脏的，需要调用用户的回调
      watcher.computedFn()
    }
    // 此时的计算Watcher已经覆盖了渲染Watcher,栈中存放了2个Watcher，一个计算，一个渲染
    if (Dep.target) {
      // 向上收集渲染Watcher
      // 找到相关依赖dep
      watcher.depend()
    }
    return watcher.value
  }
}
function defineComputed (vm, key, value) {
  let shareComputed = {}
  if (typeof value === 'function') {
    // 因为计算属性具有缓存功能，所以我们这里用高阶函数返回一个getter，getter是否能被调用取决于dirty属性
    shareComputed.get = createComputedGetter(key)
  } else {
    shareComputed.get = createComputedGetter(key)
    shareComputed.set = value.set
  }
  // 把key定义到vm上面，用于渲染模板
  Object.defineProperty(vm, key, shareComputed)
}
