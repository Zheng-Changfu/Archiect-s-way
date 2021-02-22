/**
 * 
 * @param {*} path 路径
 * @param {*} dispatch 触发route.dispatch的方法或者触发用户真实回调的方法
 */
function Layer (path, dispatch) {
  this.path = path
  this.dispatch = dispatch
}
module.exports = Layer