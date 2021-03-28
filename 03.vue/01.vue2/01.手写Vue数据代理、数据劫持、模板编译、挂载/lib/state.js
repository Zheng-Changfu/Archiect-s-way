import { observe } from './observe/index'
import { isFunction } from './utils'
export function initState (vm) {
  initData(vm)
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
