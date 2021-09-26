import { isFunc } from "./utils"
import { findDOM, compareTwoVDom } from './react-dom'

export const updateQueue = {
  // 是否为批量更新模式
  isBatchingUpdate: false,
  updaters: [],
  batchUpdate () {
    // 批量更新
    for (let i = 0; i < updateQueue.updaters.length; i++) {
      const update = updateQueue.updaters[i]
      update.updateComponent()
    }
    // 重置
    updateQueue.updaters.length = 0
    updateQueue.isBatchingUpdate = false
  }
}
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance
    this.pendingStates = []
  }
  addState (partialState) {
    this.pendingStates.push(partialState)
    this.emitUpdate()
  }
  emitUpdate () {
    const isBatchingUpdate = updateQueue.isBatchingUpdate
    if (isBatchingUpdate) {
      // 如果为批量更新模式，就将更新器都先存起来
      updateQueue.updaters.push(this)
    } else {
      // 去更新
      this.updateComponent()
    }
  }
  updateComponent () {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState () {
    const { classInstance, pendingStates } = this
    let state = classInstance.state
    for (let i = 0; i < pendingStates.length; i++) {
      let pendingState = pendingStates[i]
      if (isFunc(pendingState)) {
        // this.setState((state) => ({num:state.num + 1}))
        pendingState = pendingState(state)
      }
      // 状态合并
      state = { ...state, ...pendingState }
    }
    this.pendingStates.length = 0
    return state
  }
}

function shouldUpdate (classInstance, nextState) {
  // 更新外界状态
  classInstance.state = nextState
  // 更新
  classInstance.forceUpdate()
}

class Component {
  // 此标识用来区分为类组件还是函数式组件
  static isReactComponent = true
  constructor(props) {
    /**
     * 这里的this指向的继承者组件，因为外界是super()
     */
    this.props = props
    this.state = {}
    this.updater = new Updater(this)
  }
  setState (partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate () {
    const oldRenderVdom = this.oldRenderVdom
    const oldDom = findDOM(oldRenderVdom)
    const newVdom = this.render() // 这里的this指向组件实例
    compareTwoVDom(oldDom.parentNode, oldRenderVdom, newVdom)
    this.oldRenderVdom = newVdom
  }
}
export default Component