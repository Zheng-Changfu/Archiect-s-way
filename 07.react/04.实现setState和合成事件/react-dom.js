import { REACT_TEXT } from "./constants"
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
  const { type, props } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
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
        mount(child, dom)
      } else if (Array.isArray(child)) {
        // 数组
        reconcileChildren(child, dom)
      }
    }
  }
  // 在虚拟节点上挂一个dom属性，此属性用来标识虚拟节点对应的真实dom
  vDom.dom = dom
  return dom
}

/**
 * 
 * @param {*} vDom 虚拟Dom
 * @returns 真实dom
 */
function mountClassComponent (vDom) {
  const { type: ClassComponent, props } = vDom
  const instance = new ClassComponent(props)
  const render = instance.render
  const renderVdom = render.call(instance)
  // 添加旧的虚拟dom，方便后期去做diff
  instance.oldRenderVdom = vDom.oldRenderVdom = renderVdom
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
 * @description diff比较，暂时没有写
 * @param {*} parentNode 父节点
 * @param {*} oldVDom 老的虚拟dom
 * @param {*} newVDom 新的虚拟dom
 */
export function compareTwoVDom (parentNode, oldVDom, newVDom) {
  const oldDom = findDOM(oldVDom)
  const newDom = createDOM(newVDom)
  parentNode.replaceChild(newDom, oldDom)
}

/**
 * 
 * @param {*} vDom 虚拟dom
 * @returns 根据虚拟dom找到对应的真实dom
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