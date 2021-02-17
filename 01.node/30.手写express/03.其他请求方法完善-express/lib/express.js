// express函数模块
const Application = require('./application')
function createApplication () {
  return new Application()
}
module.exports = createApplication