const express = require('express')
const loginModel = require('../db/model/loginModel')
const router = express.Router()
const { verify, sign } = require('../utils/jwt')


router.get('/validate', async (req, res) => {
  // 验证用户token
  const token = req.headers.authorization
  if (token) {
    try {
      await verify(token)
      res.json({
        code: 200,
        message: 'ok'
      })
    } catch (error) {
      res.json({
        code: 403,
        message: 'token错误'
      })
    }
  } else {
    res.json({
      code: 403,
      message: 'token错误'
    })
  }
})
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.json({
      code: 201,
      message: '登录失败'
    })
  }
  try {
    const user = await loginModel.findOne({ username, password })

    const token = await sign(user._id)
    user.token = token
    await user.save()
    console.log(user, '1111')
    res.json({
      code: 200,
      data: {
        token,
        ...user,
      }
    })
  } catch (error) {
    console.log(error, 'error')
    res.json({
      code: 201,
      message: '登录失败'
    })
  }
})

module.exports = router