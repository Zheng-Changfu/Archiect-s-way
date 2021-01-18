// 根据不同的环境加载不同的配置
let prefix = ''
if (process.env.NODE_ENV === 'dev') {
  // 开发环境
  prefix = '/dev/api'
} else if (process.env.NODE_ENV === 'prod') {
  // 生产环境
  prefix = '/prod/api'
} else if (process.env.NODE_ENV === 'test') {
  // 测试环境
  prefix = '/test/api'
} else if (process.env.NODE_ENV === 'bug') {
  // 提交bug环境
  prefix = '/bug/api'
} else {
  // 预发布环境
  prefix = '/willProd/api'
}
module.exports = prefix
