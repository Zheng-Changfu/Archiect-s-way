import { compileTemplate } from '../utils'
function gen (c) {
  if (c.type === 1) {
    // 元素
    return generate(c)
  } else {
    // 文本 _v('hello')
    const text = c.text
    const regRes = compileTemplate.qn(text)
    // 如果没有匹配到插值语法 hello {{name}} world  ==> 'hello' + name + 'world'
    if (!regRes) {
      return `_v('${text}')`
    } else {
      const reg = compileTemplate.qn(text, 0)
      let tokens = []
      let lastIndex = 0
      text.replace(reg, function (...args) {
        if (text.slice(lastIndex, args[2])) {
          tokens.push(JSON.stringify(text.slice(lastIndex, args[2])))
        }
        if (lastIndex < text.length - 1) {
          tokens.push(args[1].trim())
        }
        lastIndex = args[2] + (args[0].length)
      })
      if (lastIndex < text.length) {
        if (text.slice(lastIndex)) {
          tokens.push(JSON.stringify(text.slice(lastIndex)))
        }
      }
      return `_v(${tokens.join('+')})`
    }
  }
}
function genChildren (root) {
  const children = root.children
  if (children && children.length) {
    const res = children.map(c => gen(c)).join(',')
    return res
  }
  return false
}
function genProps (props) {
  let str = ''
  for (let i = 0; i < props.length; i++) {
    let { key, value } = props[i]
    if (key === 'style') {
      let styleObj = {}
      // "color: red;background-color: #fff"; 转成对象
      value.replace(/([^:;]+):([^:;]+)/g, function (p, s1, s2) {
        styleObj[s1] = s2
      })
      value = styleObj
    }
    str += `${key}:${JSON.stringify(value)},`
  }
  return `{${str.slice(0, -1)}}`
}
export function generate (root) {
  // 将ast语法树拼接成字符串
  /**
   * _c('div',{id:'root',name:'zhengchangfu'},'hello')
   * new Function + with语法
   */
  const children = genChildren(root)
  let code = `_c('${root.tag}',${root.attrs.length ? genProps(root.attrs) : 'undefined'}${children ? `,${children}` : ''})`
  //code ==>  _c('div',{id:"root",name:"zhengchangfu",style:{"color":" red","background-color":" #fff"}},_c('p',undefined,_c('span',undefined,_v("我叫"+name+"哈哈"))))
  return code
} 