import { compileTemplate } from '../utils'
export function parserHtml (html) {
  /**
   * 用正则匹配标签开始，标签名，然后提取标签名放入容器中，然后移除掉匹配的部分 
   * 用正则匹配标签属性，然后提取属性放入容器中，然后移除掉匹配的部分
   * 用正则匹配标签结束，然后移除掉匹配的部分
   * 用正则匹配标签中的文本，然后提取文本放入容器中，然后移除掉匹配的部分
   * 用正则匹配标签结束，然后提取标签结束名和标签开始的标签名进行匹配，如果相同，说明标签相同，不相同，抛错
   */
  // 树根
  let root = null
  function advance (len) {
    html = html.substring(len)
  }
  // 栈
  const stack = []
  // 创建ast语法树
  function createAstElement (tag, attrs) {
    return {
      tag,
      parent: null,
      children: [],
      attrs,
      type: 1,
      text: ''
    }
  }
  function start (tag, attributes) {

    // console.log('标签开始', tag, attributes)
    // 取出栈中最后一个
    const parent = stack[stack.length - 1]
    // 创建ast元素
    const element = createAstElement(tag, attributes)
    // 如果没有根元素，那么创建出来的ast元素就是根元素
    if (!root) {
      root = element
    }
    if (parent) {
      // 有父级元素
      parent.children.push(element)
      element.parent = parent
    }
    stack.push(element)
  }
  function chars (text) {
    // console.log('标签文本', text)
    const parent = stack[stack.length - 1]
    text = text.replace(/\s/g, '')
    if (text) {
      parent.children.push({
        type: 3,
        text
      })
    }
  }
  function end (tag) {
    // console.log('标签结束', tag)
    const element = stack.pop()
    if (element.tag !== tag) {
      throw new Error('标签有误')
    }
  }
  // 解析开始标签
  function parseStartTag () {
    let startTag = compileTemplate.startTag(html)
    if (startTag) {
      advance(startTag[0].length)
      let match = {
        tag: startTag[1],
        attrs: []
      }
      let text, end
      // 匹配属性,只要没有到结束标签并且一直都可以匹配到属性，就一直循环
      while (!(end = compileTemplate.tagClose(html)) && (text = compileTemplate.tagAttributes(html))) {
        match.attrs.push({
          key: text[1],
          value: text[2] || text[3] || text[4]
        })
        advance(text[0].length)
      }
      if (end) {
        advance(end[0].length)
      }
      return match
    }
    return false
  }
  // 解析结束标签
  function parseEndTag () {
    let endTag = compileTemplate.closeTag(html)
    if (endTag) {
      advance(endTag[0].length)
      return endTag[1]
    }
    return false
  }
  while (html) {
    let index = html.indexOf('<')
    if (index === 0) {
      // 不是标签开始位置就是标签结束位置
      // 解析开始标签
      let startMatch = parseStartTag()
      if (startMatch) {
        start(startMatch.tag, startMatch.attrs)
        continue
      }
      let endMatch = parseEndTag()
      if (endMatch) {
        end(endMatch)
        continue
      }
    }
    // 拿到文本的所有内容
    let text = html.slice(0, index)
    if (text) {
      chars(text)
      advance(text.length)
    }
  }
  return root
}