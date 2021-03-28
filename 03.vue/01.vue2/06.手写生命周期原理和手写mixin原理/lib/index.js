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
export default Vue