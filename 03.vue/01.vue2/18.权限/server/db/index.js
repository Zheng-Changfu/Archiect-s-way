const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/vue2-permission')
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err)
  })
module.exports = db