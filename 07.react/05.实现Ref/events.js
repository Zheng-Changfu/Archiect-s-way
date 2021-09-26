import { updateQueue } from "./Component"
import { isFunc } from "./utils"

/**
 * @description 给document上添加事件
 * @param {*} dom dom元素
 * @param {*} eventName 事件名
 * @param {*} eventHandle 事件回调函数
 */
export function addEvent (dom, eventName, eventHandle) {
  let _store
  // 给dom上添加自定义属性，方便dispatchEvent中去触发
  if (dom._store) {
    _store = dom._store
  } else {
    dom._store = {}
    _store = dom._store
  }
  // _store.onclick = handleClick
  _store[eventName] = eventHandle
  if (!document[eventName]) {
    // document.onclick = dispatchEvent
    document[eventName] = dispatchEvent
  }
}

/**
 * @description 不管点什么按钮，触发什么事件，走的都是这个函数
 * @description 本质其实就一个切片函数，在执行用户的回调前开启批量更新模式，执行用户回调函数，关闭批量更新模式
 * @param {*} nativeEvent 原生event
 */
function dispatchEvent (nativeEvent) {
  // event.target = 当前点击的元素 button
  // event.type = 当前的事件名 click
  // event.currentTarget = 向上冒泡时的目标
  const { target, type } = nativeEvent
  const eventName = 'on' + type
  // 开启批量更新模式
  updateQueue.isBatchingUpdate = true
  // 创建合成event
  const syntheticEvent = createSyntheticEvent(nativeEvent)
  let currentTarget = target
  // 模拟向上冒泡的过程
  while (currentTarget) {
    // 拿到当前dom上的_store属性，只要dom上绑定了react的事件，react就会在这个dom上挂一个_store属性
    const _store = currentTarget._store
    // 拿到在_store属性上绑定的函数(用户的函数)
    const eventHandle = _store && _store[eventName]
    if (isFunc(eventHandle)) {
      syntheticEvent.target = target
      syntheticEvent.currentTarget = currentTarget
      // 调用用户的函数
      eventHandle.call(target, syntheticEvent)
    }
    currentTarget = currentTarget.parentNode
  }
  // 关闭批量更新
  updateQueue.isBatchingUpdate = false
  // 执行真正的更新
  updateQueue.batchUpdate()
}
function createSyntheticEvent (nativeEvent) {
  // 在这里可以做兼容性处理
  let syntheticEvent = { nativeEvent }
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  return syntheticEvent
}