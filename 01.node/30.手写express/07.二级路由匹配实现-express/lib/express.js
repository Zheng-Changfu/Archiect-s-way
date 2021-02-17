const Application = require('./application')
const Router = require('./router')
function createApplication () {
  return new Application()
}
createApplication.Router = function () {
  const application = createApplication()
  const route = function (req, res, next) {
    application._router.handle(req, res, next)
  }
  route.__proto__ = application._router
  return route
}
module.exports = createApplication