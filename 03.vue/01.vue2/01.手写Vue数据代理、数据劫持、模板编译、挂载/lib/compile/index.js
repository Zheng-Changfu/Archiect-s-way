import { parserHtml } from './parser'
import { generate } from './generate'
export function CompileToFunction (html) {
  // 将html编译成ast语法树
  let root = parserHtml(html)

  // 将ast语法树转换成代码
  let code = generate(root)
  console.log(code, 'code')
  // 将code代码串转成函数
  let render = new Function(`with(this){return ${code}}`)
  // console.log(render, 'render')
  /**
   * ƒ anonymous(){
      with(this){
        return _c(
          'div',
          {
            id:"root",
            name:"zhengchangfu",
            style:{
              "color":" red",
              "background-color":" #fff"
            }
          },
          _c(
            'p',
            undefined,
            _c(
              'span',
              undefined,
              _v(
                "我叫"+name+"哈哈"
                )
              )
            )
          )
       }
    }
   */
  return render
}
