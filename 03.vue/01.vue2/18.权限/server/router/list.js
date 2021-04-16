const express = require('express')
const router = express.Router()
const db = require('../db/getcategroies.json')

router.get('/getcategroies', (req, res) => {
  res.json(db)
})

module.exports = router