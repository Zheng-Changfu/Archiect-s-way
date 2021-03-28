export function patch (oldVnode, vNode) {
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

function createEl (vNode) {
  const { vm, text, key, children, tag, data } = vNode
  let elm = ''
  if (tag) {
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