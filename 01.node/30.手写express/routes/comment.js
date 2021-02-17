const express = require('../07.二级路由匹配实现-express/lib')
const router = express.Router()

router.get('/add', function (req, res) {
  res.end('comment-add ok')
})
router.get('/remove', function (req, res) {
  res.end('comment-remove ok')
})

module.exports = router