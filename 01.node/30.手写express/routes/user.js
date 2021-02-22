const express = require('../07.二级路由匹配实现-express/lib')
const router = express.Router()
router.get('/add', function (req, res) {
  res.end('user-add ok')
})

router.get('/remove', function (req, res) {
  res.end('user-remove ok')
})
module.exports = router