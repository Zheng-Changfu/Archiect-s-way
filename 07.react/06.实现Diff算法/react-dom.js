import { MOVE, PLACEMENT, REACTFORWARDREF, REACT_TEXT } from "./constants"
import { addEvent } from './events'
function render (vDom, container) {
  mount(vDom, container)
}

/**
 * @description 将虚拟dom创建成真实dom挂载到指定父容器上
 * @param {*} vDom 虚拟dom
 * @param {*} parentDOM 父容器
 */
function mount (vDom, parentDOM) {
  const dom = createDOM(vDom)
  if (dom) {
    parentDOM.appendChild(dom)
  }
}

/**
 * @description 根据虚拟dom创建真实dom
 * @param {*} vDom 虚拟dom
 * @returns 真实dom
 */
export function createDOM (vDom) {
  if (!vDom) return null
  const { type, props, ref } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (type.$$typeof === REACTFORWARDREF) {
    // forward
    return mountForwardComponent(vDom)
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 类组件
      return mountClassComponent(vDom)
    } else {
      // 函数组件
      return mountFunctionComponent(vDom)
    }

  } else {
    dom = document.createElement(type)
  }

  if (props) {
    updateProps(dom, {}, props)
    const child = props.children
    if (child) {
      if (typeof child === 'object' && child.type) {
        // 对象
        child._mountIndex = 0
        mount(child, dom)
      } else if (Array.isArray(child)) {
        // 数组
        reconcileChildren(child, dom)
      }
    }
  }
  // 在虚拟节点上挂一个dom属性，此属性用来标识虚拟节点对应的真实dom
  vDom.dom = dom
  if (ref) {
    ref.current = dom
  }
  return dom
}

function mountForwardComponent (vDom) {
  const { type: FunctionComponent, props, ref } = vDom
  const renderVdom = FunctionComponent.render(props, ref)
  // // 添加旧的虚拟dom，方便后期去做diff
  vDom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}

/**
 * 
 * @param {*} vDom 虚拟Dom
 * @returns 真实dom
 */
function mountClassComponent (vDom) {
  const { type: ClassComponent, props, ref } = vDom
  const instance = new ClassComponent(props)
  const render = instance.render
  const renderVdom = render.call(instance)
  // 添加旧的虚拟dom，方便后期去做diff
  instance.oldRenderVdom = vDom.oldRenderVdom = renderVdom
  if (ref) {
    ref.current = instance
  }
  return createDOM(renderVdom)
}

/**
 * 
 * @param {*} vDom 虚拟Dom
 * @returns 真实dom
 */
function mountFunctionComponent (vDom) {
  const { type: FunctionComponent, props } = vDom
  const renderVdom = FunctionComponent(props)
  // 添加旧的虚拟dom，方便后期去做diff
  vDom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}

/**
 * @description 批量挂载子节点
 * @param {*} child 子元素集合
 * @param {*} parentDOM 父元素
 */
function reconcileChildren (child, parentDOM) {
  for (let i = 0; i < child.length; i++) {
    child[i]._mountIndex = i
    mount(child[i], parentDOM)
  }
}

/**
 * 
 * @description 添加属性，diff对比
 * @param {*} dom 真实元素
 * @param {*} oldProps 旧属性
 * @param {*} newProps 新属性
 */
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      // 子节点单独处理
      continue
    } else if (key === 'style') {
      for (let styleKey in newProps[key]) {
        // 添加样式
        dom.style[styleKey] = newProps[key][styleKey]
      }
    } else if (key.startsWith('on')) {
      // 事件
      addEvent(dom, key.toLowerCase(), newProps[key])
    } else {
      // 其他属性
      dom[key] = newProps[key]
    }
  }
}

/**
 * @description diff比较
 * @param {*} parentNode 父节点
 * @param {*} oldVDom 老的虚拟dom
 * @param {*} newVDom 新的虚拟dom
 */
export function compareTwoVDom (parentNode, oldVDom, newVDom, nextDOM) {
  if (!oldVDom && !newVDom) { // 老新都没有，什么都不做
    return null
  } else if (oldVDom && !newVDom) { // 老的有，新的没有
    unmountVDom(oldVDom) // 卸载老节点
  } else if (!oldVDom && newVDom) { // 老的没有，新的有
    const currentDOM = createDOM(newVDom)
    if (nextDOM) {
      parentNode.insertBefore(currentDOM, nextDOM)
    } else {
      parentNode.appendChild(currentDOM)
    }
  } else if (oldVDom && newVDom && oldVDom.type !== newVDom.type) { // 老的有，新的也有，但是类型不同
    unmountVDom(oldVDom)
    const currentDOM = createDOM(newVDom)
    if (nextDOM) {
      parentNode.insertBefore(currentDOM, nextDOM)
    } else {
      parentNode.appendChild(currentDOM)
    }
  } else { // 老的有，新的也有，类型也一样
    updateElement(oldVDom, newVDom)
  }
}

function updateElement (oldVDom, newVDom) {
  if (oldVDom.type === REACT_TEXT) { // 都是文本
    updateText(oldVDom, newVDom)
  } else if (typeof oldVDom.type === 'string') { // 都是元素
    const currentDOM = newVDom.dom = findDOM(oldVDom)
    updateProps(currentDOM, oldVDom.props, newVDom.props)
    updateChildren(currentDOM, oldVDom.props.children, newVDom.props.children)
  } else if (typeof oldVDom.type === 'function') { // 都是函数
    const isReactComponent = oldVDom.type.isReactComponent
    if (isReactComponent) { // 类组件
      updateClassComponent(oldVDom, newVDom)
    } else { // 函数组件
      updateFunctionComponent(oldVDom, newVDom)
    }
  }
}

function updateClassComponent (oldVDom, newVDom) {
  const classInstance = newVDom.classInstance = oldVDom.classInstance
  classInstance.updater.emitUpdate(newVDom.props)
}

function updateFunctionComponent (oldVDom, newVDom) {
  const currentDOM = findDOM(oldVDom)
  const parentDOM = currentDOM.parentNode
  const newRenderDOM = newVDom.type(newVDom.props)
  compareTwoVDom(parentDOM, oldVDom.oldRenderVdom, newRenderDOM)
  newVDom.oldRenderVdom = newRenderDOM
}

function updateChildren (dom, oldVChildren, newVChildren) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : oldVChildren ? [oldVChildren] : []
  newVChildren = Array.isArray(newVChildren) ? newVChildren : newVChildren ? [newVChildren] : []
  const oldVChildMap = {} // 映射表
  let lastPlacedIndex = 0
  let patch = [] // 存放操作的数组

  oldVChildren.forEach((oldVChild, index) => { // 填充映射表
    const key = oldVChild.key || index // 没有key就用index
    oldVChildMap[key] = oldVChild
  })

  newVChildren.forEach((newVChild, index) => {
    newVChild._mountIndex = index // 挂载的索引
    const newVChildKey = newVChild.key || index
    const oldVChild = oldVChildMap[newVChildKey]

    if (oldVChild) {
      // 此节点更新前更新后都是存在的
      // 递归比对元素，属性,这里省略属性比对
      updateElement(oldVChild, newVChild)
      if (oldVChild._mountIndex < lastPlacedIndex) { // 要被移动
        /*更新前
          *节点key:   A B C D 
          *节点索引:  0 1 2 3
         * 
         *更新后
          *节点key:   B C D A
          *节点索引:  1 2 3 0
        
         * 第一次: lastPlacedIndex=0,_mountIndex=1,不变,lastPlacedIndex=1
           第二次: lastPlacedIndex=1,_mountIndex=2,不变,lastPlacedIndex=2
           第三次: lastPlacedIndex=2,_mountIndex=3,不变,lastPlacedIndex=3
           第四次: lastPlacedIndex=3,_mountIndex=0,A要从_mountIndex(0)移动到当前index(3),lastPlacedIndex=3

           结果为B、C、D、A
         */
        patch.push({
          type: MOVE,
          oldVChild,
          newVChild,
          fromIndex: oldVChild._mountIndex,
          toIndex: index
        })
      }
      // 删除存在的oldVChild
      delete oldVChildMap[newVChildKey]
      // 更新lastPlacedIndex
      lastPlacedIndex = Math.max(oldVChild._mountIndex, lastPlacedIndex)

    } else { // 新增节点
      patch.push({
        type: PLACEMENT,
        newVChild,
        toIndex: index
      })
    }
  })

  // removeChild方法只会把元素从页面中移除，还是会短暂的存在内存中一段时间
  const moveChilds = patch.filter(action => action === MOVE).map(item => item.oldVChild)
  // oldVChildMap中多余的要被清空掉,删除节点
  Object.values(oldVChildMap).concat(moveChilds).forEach(oldVChild => {
    const currentDOM = findDOM(oldVChild)
    currentDOM.parentNode.removeChild(currentDOM)
  })

  patch.forEach(action => {
    const { type, newVChild, oldVChild, fromIndex, toIndex } = action
    const childNodes = dom.childNodes // 获取真实的子DOM元素的集合[A,C,E]
    if (type === PLACEMENT) { // 新增新的DOM
      const currentDOM = createDOM(newVChild)
      const childDomNode = childNodes[toIndex]
      if (childDomNode) {
        dom.insertBefore(currentDOM, childDomNode)
      } else {
        dom.appendChild(currentDOM)
      }
    } else if (type === MOVE) { // 移动老的DOM
      const oldDom = findDOM(oldVChild)
      const childDomNode = childNodes[toIndex]
      if (childDomNode) {
        dom.insertBefore(oldDom, childDomNode)
      } else {
        dom.appendChild(oldDom)
      }
    }
  })
}

function updateText (oldVDom, newVDom) {
  const currentDOM = newVDom.dom = findDOM(oldVDom)
  if (oldVDom.props.content !== newVDom.props.content) {
    currentDOM.textContent = newVDom.props.content
  }
}

/**
 * @description 卸载虚拟DOM
 * @param {*} vDom 虚拟DOM
 */
function unmountVDom (vDom) {
  const { props, ref } = vDom
  const currentDom = findDOM(vDom)
  // 移除ref
  if (ref) {
    ref.current = null
  }
  if (props.children) {
    // 一个为对象，多个为数组，这里统一处理
    props.children = Array.isArray(props.children) ? props.children : [props.children]
    // 如果父节点被卸载，递归卸载子节点
    props.children.forEach(unmountVDom)
  }
  // 页面中移除DOM
  if (currentDom) {
    currentDom.parentNode.removeChild(currentDom)
  }
}

/**
 * @description 根据虚拟dom找到对应的真实dom
 * @param {*} vDom 虚拟dom
 * @returns 真实DOM | null
 */
export function findDOM (vDom) {
  // 递归
  // if (!vDom) return null
  // if (vDom.dom) {
  //   // 真实元素
  //   return vDom.dom
  // } else {
  //   // 组件就继续找
  //   return findDOM(vDom.oldRenderVdom)
  // }

  // 迭代
  const stack = [vDom]
  while (stack.length) {
    const vdom = stack.pop()
    if (!vdom) return null
    if (vdom.dom) return vdom.dom
    stack.push(vdom.oldRenderVdom)
  }

}

const ReactDOM = {
  render
}
export default ReactDOM