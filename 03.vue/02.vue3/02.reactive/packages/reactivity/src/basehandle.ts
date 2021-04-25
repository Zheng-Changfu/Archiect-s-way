import { isObject, extend } from "@vue/shared/src"
import { readonly, reactive } from "./reactive"

const get = createGetter(false, false)
const shallowReactiveGetter = createGetter(false, true)
const readonlyGetter = createGetter(true, false)
const shallowReadonlyGetter = createGetter(true, true)
const set = createSetter()
const shallowReactiveSet = createSetter(true)
const readonlySetter = {
  set: () => {
    console.warn('set key fail')
  }
}
export const mutableHandles = {
  get,
  set
}
export const shallowReactiveHandles = {
  get: shallowReactiveGetter,
  set: shallowReactiveSet
}
export const readonlyHandles = extend({
  get: readonlyGetter,
}, readonlySetter)
export const shallowReadonlyHandles = extend({
  get: shallowReadonlyGetter,
  set
}, readonlySetter)
// 柯里化
/**
 * 
 * @param isReadonly 是否只读，默认不是只读
 * @param shallow 是否浅层代理，默认不是浅层代理
 */
export function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if (!isReadonly) {

    }
    if (shallow) {
      // 是否为浅层代理
      return res
    }
    if (isObject(res)) {
      // 如果读取到的值还是一个对象类型的话，要进行深度代理
      // 递归，相比较vue2代理，vue3代理是当我们取值时才会进行深度代理(懒代理)
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res
  }
}
/**
 * 
 * @param shallow 是否为浅层代理,默认不是浅层代理
 */
export function createSetter(shallow = false) {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)

    return res
  }
}