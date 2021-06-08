import { extend, stringify, isObject } from "@vue/shared"
import { readonly, reactive } from "./reactive"
import { OpeaTypes } from "packages/shared/src/opeartors"
import { track } from "./effect"

/**
 * 
 * @param readonly 是否为只读的，默认不是
 * @param shallow 是否为浅层的，默认不是
 */
const createGetter = function (isReadonly = false, shallow = false) {
  // 真实的get函数，当读取代理对象中的值时，会触发此函数
  /**
   * @param target 目标对象
   * @param property 被获取的属性名
   * @param receiver 代理对象
   */
  return function get(target, property, receiver) {
    const res = Reflect.get(target, property, receiver)
    // 如果不是只读的，就说明要收集对应的依赖，因为只读的话不能被修改，所以不需要收集依赖，这些依赖后面会去更新我们对应的视图
    if (!isReadonly) {
      // 收集依赖...
      track(target, OpeaTypes.GET, property)
    }
    // 如果是浅层代理，那么直接返回结果即可,不需要继续进行代理了
    if (shallow) {
      return res
    }
    // 如果取到的值还是一个对象,那么我们要递归进行代理
    if (isObject(res)) {
      // 看是否为只读的
      return isReadonly ? readonly(res) : reactive(res)
    }

    return res
  }
}
const createSetter = function (shallow = false) {
  /**
   * @param target 目标对象
   * @param property 被获取的属性名
   * @param value 新属性值
   * @param receiver 代理对象
   */
  return function set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver)
  }
}
const readonlyObj = {
  set: function (target, key) {
    console.warn(`set ${key} on ${stringify(target)} failed`)
  }
}
export const mutableHandles = {
  get: createGetter(),
  set: createSetter()
}
export const shallowReactiveHandles = {
  get: createGetter(false, true),
  set: createSetter(true)
}
export const readonlyHandles = extend({
  get: createGetter(true, false),
}, readonlyObj.set)
export const shallowReadonlyHandles = extend({
  get: createGetter(true, true)
}, readonlyObj.set)
