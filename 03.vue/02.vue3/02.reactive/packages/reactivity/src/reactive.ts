import { mutableHandles, shallowReadonlyHandles, shallowReactiveHandles, readonlyHandles } from './basehandles'
import { isObject } from '@vue/shared'

// 返回一个代理对象，深度代理，可修改
export function reactive(target) {
  return createReactiveObject(target, false, mutableHandles)
}
// 返回一个代理对象，浅层代理，可修改
export function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandles)
}
// 返回一个代理对象，深度代理，不可被修改
export function readonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandles)
}
// 返回一个代理对象，浅层代理，未被代理的可以被修改
export function shallowReadonly(target) {
  return createReactiveObject(target, true, readonlyHandles)
}
const reactiveMap = new WeakMap;
const readonlyMap = new WeakMap;

/**
 * 
 * @param target 要被代理的对象
 * @param isReadOnly 是否为只读
 * @param handles proxy中的处理逻辑(get/set)
 */
function createReactiveObject(target, isReadOnly, handles) {
  // 如果要被代理的对象不是一个对象,那么返回原对象
  if (!isObject(target)) return target
  // 先从缓存中读取结果，如果已经被存过了，那么直接返回缓存的代理结果即可
  const proxyMap = isReadOnly ? readonlyMap : reactiveMap
  const isExitsProxy = proxyMap.get(target)
  if (isExitsProxy) {
    return isExitsProxy
  }
  // 对象如果被代理过，就不用再次代理，那么我们需要将代理过的结果缓存起来
  const proxy = new Proxy(target, handles)
  // 缓存代理结果，形成原目标和代理目标的映射关系
  proxyMap.set(target, proxy)
  // 返回代理对象
  return proxy
}