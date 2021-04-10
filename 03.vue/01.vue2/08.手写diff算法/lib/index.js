import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import { stateMixin } from './state'
import { globalMixin } from './global-api/index.js'
function Vue (options) {
  this._init(options)
}
initMixin(Vue)
renderMixin(Vue)
lifecycleMixin(Vue)
stateMixin(Vue)
globalMixin(Vue)


// import { CompileToFunction } from './compile/index'
// import { createEl, patch } from './vDom/patch'

// 第一种:如果标签不一样，直接用新的标签替换掉老的标签
// let oldTemplate = `<p>{{message}}</p>`

// 第二种:比对属性
// let oldTemplate = `<div a="1" style="font-size:14px;">1</div>`

// 第三种:如果没有标签，文本不一样，直接替换文本
// let oldTemplate = `{{message}}`

// 第四种:如果标签一样，老的有孩子,新的没孩子
// let oldTemplate = `<div><li>A</li></div>`

// 第五种:如果标签一样，老的没孩子,新的有孩子
// let oldTemplate = `<div></div>`

// 第六种:都有孩子
// let oldTemplate = `<div>
// <li>A</li>
// <li>B</li>
// <li>C</li>
// </div>`

// 第七种:新增一个孩子(尾部添加)的情况
// let oldTemplate = `<div>
// <li>A</li>
// <li>B</li>
// <li>C</li>
// </div>`

// 第八种:新增一个孩子(头部添加)的情况
// let oldTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// </div>`

// 第九种:老头和新尾相同情况
// let oldTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// </div>`

// 第十种:老尾和新头相同情况
// let oldTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// </div>`

// 第十一种:删除一个的情况
// let oldTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// </div>`

// 第十二种:乱序
// let oldTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// </div>`

// let render1 = CompileToFunction(oldTemplate)

// let vm1 = new Vue({
//   data: {
//     message: 1
//   }
// })
// const oldNode = render1.call(vm1)
// document.body.appendChild(createEl(oldNode))


// 第一种:如果标签不一样，直接用新的标签替换掉老的标签
// let newTemplate = `<div>{{message}}</div>`

// 第二种: 标签一样，对比属性
// let newTemplate = `<div a="b" style="color:red;">1</div>`

// 第三种:如果没有标签，文本不一样，直接替换文本
// let newTemplate = `{{message}}`

// 第四种:如果标签一样，老的有孩子,新的没孩子
// let newTemplate = `<div></div>`

// 第五种:如果标签一样，老的没孩子,新的有孩子
// let newTemplate = `<div><li>A</li></div>`

// 第六种:都有孩子
// let newTemplate = `<div>
// <li>A</li>
// <li>D</li>
// <li>C</li>
// </div>`

// 第七种:新增一个孩子(尾部添加)的情况
// let newTemplate = `<div>
// <li>A</li>
// <li>B</li>
// <li>C</li>
// <li>D</li>
// </div>`

// 第八种:新增一个孩子(头部添加)的情况
// let newTemplate = `<div>
// <li key="D">D</li>
// <li key="E">E</li>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// </div>`

// 第九种:老头和新尾相同情况
// let newTemplate = `<div>
// <li key="B">B</li>
// <li key="C">C</li>
// <li key="D">D</li>
// <li key="A">A</li>
// </div>`

// 第十种:老尾和新头相同情况
// let newTemplate = `<div>
// <li key="D">D</li>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// </div>`

// 第十一种:删除一个的情况
// let newTemplate = `<div>
// <li key="A">A</li>
// <li key="B">B</li>
// <li key="C">C</li>
// </div>`

// 第十二种:乱序
// let newTemplate = `<div>
// <li key="B">B</li>
// <li key="F">F</li>
// <li key="D">D</li>
// <li key="E">E</li>
// </div>`

// let render2 = CompileToFunction(newTemplate)

// let vm2 = new Vue({
//   data: {
//     message: 2
//   }
// })
// const newNode = render2.call(vm2)

// setTimeout(() => {
//   patch(oldNode, newNode)
// }, 2000)

export default Vue