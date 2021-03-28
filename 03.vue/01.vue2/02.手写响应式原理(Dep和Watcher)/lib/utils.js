export const isFunction = val => {
  return typeof val === 'function'
}
export const isObject = val => {
  return typeof val === 'object' && val !== null
}
export const isArray = val => {
  return Array.isArray(val)
}

export let compileTemplate = {
  // 匹配标签名
  tag: `[a-zA-Z][0-9a-zA-Z]*`,
  // 匹配标签开始
  startTag: html => {
    const reg = new RegExp(`^<(${compileTemplate.tag})`)
    return html.match(reg)
  },
  // 匹配标签属性
  tagAttributes: text => {
    // 标签属性有3种,a=b a='b' a="b",前后可能有多个空格
    const reg = /\s*([^=\s'"\/<>]+)\s*=\s*(?:"([^"]+)")|(?:'([^']+)')|([^\s"'=<>`]+)?/
    return text.match(reg)
  },
  // 匹配标签结束
  tagClose: text => {
    // 可能为自结束标签，可以为> ,/>
    const reg = /^\s*(\/?)>/
    return text.match(reg)
  },
  // 匹配结束标签
  closeTag: text => {
    // </div >
    const reg = new RegExp(`^<\/(${compileTemplate.tag})*>`)
    return text.match(reg)
  },
  // 匹配插值语法
  qn: (text, count = 1) => {
    const reg = /\{\{([\s\S]*?)\}\}/g
    return count ? text.match(reg) : reg
  }
}