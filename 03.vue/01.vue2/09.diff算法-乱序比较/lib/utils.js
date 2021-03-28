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
  tag: `[a-zA-Z][-0-9a-zA-Z]*`,
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
  // 按照正常来说，肯定是内部源码调用的nextTick先进来，然后再是函数，因为代码是一行行执行的
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

const hooks = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]
const stracts = {}
for (let i = 0; i < hooks.length; i++) {
  const hook = hooks[i]
  stracts[hook] = mergeHook
}

// 组件的合并策略
/**
 * 会按照原型链的方式进行合并，如果自身上找不到，在找原型上的(Vue.component)
 */
stracts.components = function (parentValue, childValue) {
  // options.__proto__ = parentValue
  let options = Object.create(parentValue)
  if (childValue) {
    for (let key in childValue) {
      options[key] = childValue[key]
    }
  }
  return options
}

// 生命周期钩子的合并策略
function mergeHook (parentValue, childValue) {
  if (childValue) {
    if (parentValue) {
      return parentValue.concat(childValue); // 后续
    } else {
      return [childValue]; // 第一次
    }
  } else {
    return parentValue
  }
}


export function mergeOptions (parent, child) {
  let obj = {}
  for (let key in parent) {
    mergeField(key)
  }
  for (let key in child) {
    mergeField(key)
  }
  function mergeField (key) {
    /**
     * 
     * 情况:
     *  parent : {a:1} child : {a:2} ==> {a:2}
     *  parent : {a:1,data:{c:1}} child : {b:2,data:{d:2}} ==> {a:1,data:{c:1,d:2},b:2}
     *  parent : {}  child : {beforeCreated:fn} ==> {beforeCreated:[fn]}
     *  parent : {beforeCreated:[fn]} child : {beforeCreated:fn} ==> {beforeCreated:[fn1,fn2]}
     * **/
    const parentValue = parent[key]
    const childValue = child[key]
    // 生命周期策略
    if (stracts[key]) {
      obj[key] = stracts[key](parentValue, childValue)
    } else {
      // 如果value是对象，暂时不考虑递归合并，浅拷贝
      // 如果value不是对象，那么以child数据为准
      if (isObject(parentValue) && isObject(childValue)) {
        obj[key] = { ...parentValue, ...childValue }
      } else {
        // 如果子没值，就取父的值
        obj[key] = childValue || parentValue
      }
    }
  }
  return obj
}

export function isReverseTag (tag) {
  // 这里我们意思一下就行
  const str = 'a,b,i,img,p,ul,li,div,button'
  return str.includes(tag)
}