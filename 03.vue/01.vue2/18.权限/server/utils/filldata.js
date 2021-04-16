const loginModel = require('../db/model/loginModel')
const data = require('../db/users.json')
require('../db')
data.forEach(async item => {
  await loginModel.create({
    ...item
  })
})
console.log('数据库数据载入成功')