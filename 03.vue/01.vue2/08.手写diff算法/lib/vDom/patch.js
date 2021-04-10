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
    return el
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

  // 乱序情况的映射表
  const makeIndexForKey = oldChildren.reduce((p, c, i) => {
    // 用户key
    const key = c.key
    p[key] = i
    return p
  }, {}) // {A:0,B:1,C:2,D:3}

  while ((oldStartIndex <= oldEndIndex) && (newStartIndex <= newEndIndex)) {
    // 只要新老节点 有一方没有，循环就结束
    // 如果老节点没值，说明已经被移动走了，直接跳过即可
    if (!oldStartNode) {
      oldStartNode = oldChildren[++oldStartIndex]
    } else if (!oldEndNode) {
      oldEndNode = oldChildren[--oldEndIndex]
    }

    if (isSameNode(oldStartNode, newStartNode)) {
      // 头头比较
      // 递归比较文本,标签,属性,子节点
      patch(oldStartNode, newStartNode)
      // 移动指针,更改节点
      oldStartNode = oldChildren[++oldStartIndex]
      newStartNode = newChildren[++newStartIndex]
    } else if (isSameNode(oldEndNode, newEndNode)) {
      // 尾尾比较
      patch(oldEndNode, newEndNode)
      oldEndNode = oldChildren[--oldEndIndex]
      newEndNode = newChildren[--newEndIndex]
    } else if (isSameNode(oldStartNode, newEndNode)) {
      // 老头和新尾比较
      // 如果一样，应该插入到最后一个元素的下一项元素前面reverse
      patch(oldStartNode, newEndNode)
      el.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling)
      oldStartNode = oldChildren[++oldStartIndex]
      newEndNode = newChildren[--newEndIndex]
    } else if (isSameNode(oldEndNode, newStartNode)) {
      // 老尾和新头比较
      // 如果一样，应该插入到第一个元素的前面
      patch(oldEndNode, newStartNode)
      el.insertBefore(oldEndNode.el, oldStartNode.el)
      oldEndNode = oldChildren[--oldEndIndex]
      newStartNode = newChildren[++newStartIndex]
    } else {
      // 乱序比较
      // 将老的节点形成一个映射表，然后用新元素去老的里面找，如果找到了，就给他插入到老开头指针的前面，没找到，就在老指针前面插入一个元素
      // 找到了，就在映射表里面将找到的那一项填个坑，赋值为null,然后递归比较子节点
      const newKey = newStartNode.key
      // 如果newKey在映射表里面不存在，就说明是新节点，要创建的，创建的节点要放在老节点开始的前面
      if (!makeIndexForKey[newKey]) {
        el.insertBefore(createEl(newStartNode), oldStartNode.el)
      } else {
        const moveIndex = makeIndexForKey[newKey]
        const moveNode = oldChildren[moveIndex]
        // oldChildren中的这项值填充null，表示被移动走了,也防止数组塌陷
        oldChildren[moveIndex] = null
        // 移动
        el.insertBefore(moveNode.el, oldStartNode.el)
        // 递归比较子节点
        patch(moveNode, newStartNode)
      }
      // 移动新指针
      newStartNode = newChildren[++newStartIndex]
    }
  }
  // 新增一个的情况,可能是头部增加，可能是尾部增加，这个时候我们就需要用key来进行判断了
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // insertBefore可能实现appendChild功能
      // 看尾指针元素的下一个元素是否存在，如果存在，就代表是往前追加，如果不存在，代表是往后追加
      const nextNode = newChildren[newEndIndex + 1]
      const anthor = nextNode ? nextNode.el : null
      el.insertBefore(createEl(newChildren[i]), anthor)
    }
  }
  // 删除一个的情况
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i]) {
        el.removeChild(oldChildren[i].el)
      }
    }
  }
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