import { REACT_TEXT } from "./constants"

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
function createDOM (vDom) {
  if (!vDom) return null
  const { type, props } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
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
  return dom
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
    } else {
      // 其他属性
      dom[key] = newProps[key]
    }
  }
}

const ReactDOM = {
  render
}
export default ReactDOM