const jwt = require('jsonwebtoken')
const config = require('../config')
function sign (data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, config.privateKey, function (err, token) {
      if (!err) {
        resolve(token)
      } else {
        reject(err)
      }
    })
  })

}

function verify (token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.privateKey, function (err, decoded) {
      if (!err) {
        resolve(decoded)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  sign,
  verify
}