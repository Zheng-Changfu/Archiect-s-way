const express = require('express')
const cors = require('cors')
const app = express()
const imgList = []

app.use(cors())
app.get('/getlist', function (req, res) {
  let i = 20
  imgList.length = 0
  while (i--) {
    imgList.push('/assets/1.jpeg')
  }
  res.send(imgList)
})

app.listen(3000)