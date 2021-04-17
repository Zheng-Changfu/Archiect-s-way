const express = require('express')
const router = express.Router()
const db = require('../db/getcategroies.json')
const getswiperlist = require('../db/getswiperlist.json')

router.get('/getcategroies', (req, res) => {
  res.json({
    code: 200,
    data: db
  })
})
router.get('/getswiper', (req, res) => {
  res.json({
    code: 200,
    data: getswiperlist
  })
})

module.exports = router