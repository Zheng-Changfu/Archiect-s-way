// Vue的入口

import { initMixin } from './init'
function Vue (ops) {
  // 用户传入的配置项
  this._init(ops)
}
// Vue原型的方法我们使用注入的方式来进行扩展
initMixin(Vue)
export default Vue