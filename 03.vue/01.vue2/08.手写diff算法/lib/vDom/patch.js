export function patch (oldVnode, vNode) {
  if (!oldVnode) {
    return createEl(vNode)
  }
  const parent = oldVnode.parentNode
  if (parent && parent.nodeType === 1) {
    // 真实元素
    const elm = createEl(vNode)
    parent.insertBefore(elm, oldVnode.nextSibling)
    parent.removeChild(oldVnode)
    return elm
  } else {
    // diff算法比较
    // console.log(oldVnode, vNode)
    // 第一种，如果标签名不一样，直接新的覆盖老的
    if (oldVnode.tag !== vNode.tag) {
      return oldVnode.el.parentNode.replaceChild(createEl(vNode), oldVnode.el)
    }
    // 说明标签肯定一样，复用老的节点
    let el = vNode.el = oldVnode.el
    // 如果文本不一样,用新的文本替换老的文本
    if (oldVnode.tag === undefined) {
      if (oldVnode.text !== vNode.text) {
        el.textContent = vNode.text
      }
      return
    }
    // 比对属性
    patchProps(vNode, oldVnode.data)
    // 比对孩子
    const oldChildren = oldVnode.children || []
    const newChildren = vNode.children || []
    // 都有孩子
    if (oldChildren.length > 0 && newChildren.length > 0) {
      // 比对孩子
      patchChildren(el, oldChildren, newChildren)
    } else if (oldChildren.length > 0) {
      // 老节点有孩子，新节点没孩子,应该删除孩子
      el.innerHTML = ''
    } else if (newChildren.length > 0) {
      // 新节点有孩子，老节点没孩子,应该添加孩子
      for (let i = 0; i < newChildren.length; i++) {
        el.appendChild(createEl(newChildren[i]))
      }
    }
  }
}

function patchChildren (el, oldChildren, newChildren) {
  // 双指针
  let oldStartIndex = 0
  let oldStartNode = oldChildren[oldStartIndex]
  let oldEndIndex = oldChildren.length - 1
  let oldEndNode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartNode = newChildren[newStartIndex]
  let newEndIndex = newChildren.length - 1
  let newEndNode = newChildren[newEndIndex]
  while ((oldStartIndex <= oldEndIndex) && (newStartIndex <= newEndIndex)) {
    // 只要新老节点 有一方没有，循环就结束
    if (isSameNode(oldStartNode, newStartNode)) {
      // 头头比较
      // 递归比较文本,标签,属性,子节点
      patch(oldStartNode, newStartNode)
      // 移动指针,更改节点
      oldStartNode = oldChildren[++oldStartIndex]
      newStartNode = newChildren[++newStartIndex]
    } else if (isSameNode(oldEndNode, newEndNode)) {
      // 尾尾比较
      
    }
  }
  // 新增一个的情况

}

function isSameNode (oldNode, newNode) {
  return (oldNode.tag === newNode.tag) && (oldNode.key === newNode.key)
}

function patchProps (vNode, oldProps = {}) {
  let el = vNode.el
  let newProps = vNode.data || {}
  let newStyle = newProps.style || {}
  let oldStyle = oldProps.style || {}

  for (let key in oldStyle) {
    // 如果老的样式在新的上面没有，应该删除老的样式
    if (!newStyle[key]) {
      el.style[key] = ''
    }
  }

  for (let key in oldProps) {
    // 如果老的属性新的上面没有，应该删除老的
    if (!newProps[key]) {
      if (key === 'style') {
        for (let attr in oldProps[key]) {
          el.style[attr] = ''
        }
      } else {
        el.removeAttribute(key)
      }
    }
  }

  // 循环添加新属性
  for (let key in newProps) {
    if (key === 'style') {
      for (let attr in newProps[key]) {
        el.style[attr] = newProps[key][attr]
      }
    } else {
      el.setAttribute(key, newProps[key])
    }
  }
}

function createComponent (vNode) {
  let i = vNode.data
  if ((i = i.hook) && (i = i.init)) {
    // 调用vNode.data.hook.init
    i(vNode)
  }
  if (vNode.componentInstance) { // 有属性说明子组件new完毕了，并且组件对应的真实DOM挂载到了componentInstance.$el
    return true;
  }
}

export function createEl (vNode) {
  const { vm, text, key, children, tag, data } = vNode
  let elm = ''
  if (typeof tag === 'string') {
    if (createComponent(vNode)) {
      // 返回组件对应的真实节点
      return vNode.componentInstance.$el;
    }
    // 标签
    elm = vNode.el = document.createElement(tag) // 虚拟节点上面都有一个el属性，对应真实元素，在做diff算法比较的时候有用
    patchProps(vNode)
    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        elm.appendChild(createEl(item))
      }
    }
  } else {
    // 文本
    elm = vNode.el = document.createTextNode(text)
  }
  return elm
}