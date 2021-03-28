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




import { CompileToFunction } from './compile/index'
import { createEl, patch } from './vDom/patch'

// 第一种:如果标签不一样，直接用新的标签替换掉老的标签
// let oldTemplate = `<p>{{message}}</p>`

// 第二种:如果没有标签，文本不一样，直接替换文本
let oldTemplate = `<div>1</div>`

let render1 = CompileToFunction(oldTemplate)
let vm1 = new Vue({
  data: {
    message: 1
  }
})
const oldNode = render1.call(vm1)
document.body.appendChild(createEl(oldNode))


// 第一种:如果标签不一样，直接用新的标签替换掉老的标签
// let newTemplate = `<div>{{message}}</div>`

// 第二种:如果没有标签，文本不一样，直接替换文本
let newTemplate = `<div a=b>2</div>`

let render2 = CompileToFunction(newTemplate)
let vm2 = new Vue({
  data: {
    message: 2
  }
})
const newNode = render2.call(vm2)
setTimeout(() => {
  patch(oldNode, newNode)
}, 2000)

export default Vue