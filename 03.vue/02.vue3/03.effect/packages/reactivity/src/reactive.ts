import {
  mutableHandles,
  shallowReactiveHandles,
  readonlyHandles,
  shallowReadonlyHandles
} from './basehandle'
import { isObject } from '@vue/shared'
// 深度代理
export const reactive = (target) => {
  return createProxy(target, false, mutableHandles)
}
// 浅层代理
export const shallowReactive = (target) => {
  return createProxy(target, false, shallowReactiveHandles)
}
// 深度代理/只读
export const readonly = (target) => {
  return createProxy(target, true, readonlyHandles)
}
// 浅层代理/浅层只读
export const shallowReadonly = (target) => {
  return createProxy(target, true, shallowReadonlyHandles)
}

/**
 * 
 * @param target 要被代理的目标对象
 * @param isReadonly 是否只读
 * @param basehandle get/set
 */
const reativeMap = new WeakMap()
const readonlyMap = new WeakMap()
export function createProxy(target, isReadonly, basehandle) {
  // 如果目标不是对象，就不能被代理
  if (!isObject(target)) return target
  // 缓存代理的结果,不要被多次代理
  // 根据是否只读决定不同的存储空间
  const proxyMap = isReadonly ? readonlyMap : reativeMap
  if (proxyMap.get(target)) {
    // 返回上一次存储的代理结果即可
    return proxyMap.get(target)
  }
  const proxy = new Proxy(target, basehandle)
  // 存储到容器中
  proxyMap.set(target, proxy)
  return proxy
}