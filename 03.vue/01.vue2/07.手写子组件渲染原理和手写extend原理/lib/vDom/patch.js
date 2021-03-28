export function patch (oldVnode, vNode) {
  if (!oldVnode) {
    return createEl(vNode)
  }
  // 新旧虚拟dom比较,暂时不做
  const parent = oldVnode.parentNode
  if (parent.nodeType === 1) {
    // 真实元素
    const elm = createEl(vNode)
    parent.insertBefore(elm, oldVnode.nextSibling)
    parent.removeChild(oldVnode)
    return elm
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

function createEl (vNode) {
  const { vm, text, key, children, tag, data } = vNode
  let elm = ''
  if (typeof tag === 'string') {
    if (createComponent(vNode)) {
      // 返回组件对应的真实节点
      return vNode.componentInstance.$el;
    }
    // 标签
    elm = document.createElement(tag)
    if (children && children.length) {
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        elm.appendChild(createEl(item))
      }
    }
  } else {
    // 文本
    elm = document.createTextNode(text)
  }
  return elm
}