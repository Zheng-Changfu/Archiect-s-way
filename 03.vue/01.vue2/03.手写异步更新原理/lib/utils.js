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


let callbacks = []
let watting = false
export function nextTick (cb) {
  // 按照正常情况来说，肯定是内部源码调用的nextTick先进来，然后再是函数，因为代码是一行行执行的
  callbacks.push(cb)
  // 也要做防抖，不能每次调用nextTick都循环一次
  if (!watting) {
    watting = true
    Promise.resolve().then(flushCallbacks)
  }
}
function flushCallbacks () {
  for (let i = 0; i < callbacks.length; i++) {
    const cb = callbacks[i]
    cb()
  }
  callbacks = []
  watting = false
}