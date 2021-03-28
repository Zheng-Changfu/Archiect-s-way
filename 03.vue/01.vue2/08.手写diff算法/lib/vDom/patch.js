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
    debugger
    // diff算法比较
    // console.log(oldVnode, vNode)
    // 第一种，如果标签名不一样，直接新的覆盖老的
    if (oldVnode.tag !== vNode.tag) {
      return oldVnode.el.parentNode.replaceChild(createEl(vNode), oldVnode.el)
    }
    let el = oldVnode.el
    // if (oldVnode.text === vNode.text) {

    // }

    // 比对属性
    patchProps(el, oldVnode, vNode)
  }
}

function patchProps (el, oldVnode, vNode) {
  // 如果旧虚拟dom上面没有属性，新的上面有，那就应该遍历新的，看新的属性在旧虚拟dom上有没有，如果没有，就添加属性
  for (let key in vNode.props) {
    const newValue = vNode.props[key]
    // 如果新的属性在老的上面没有
    if (!oldVnode.props[newValue]) {
      // 设置属性
      el.setAttribute(key, newValue)
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