/**
 * 思路:
 *    
 */
const http = require('http')
const queryString = require('querystring')
const crypto = require('crypto')
const uuid = require('uuid')
const key = 'zcf'
const cardName = 'connect.sid' // 卡片名字
const session = {} // 会话空间内存
// 加盐签名
function signed (value) {
  return crypto.createHmac('sha256', key).update(value.toString()).digest('base64')
}
const server = http.createServer((req, res) => {
  let cookies = []
  req.getCookie = function (key, options) {
    if (req.headers['cookie']) {
      const cookieObj = queryString.parse(req.headers['cookie'], '; ')
      if (options.signed && cookieObj[key]) {
        const [value, sign] = cookieObj[key].split('.')
        if (signed(value) === sign) {
          return value
        } else {
          return ''
        }
      }
      return cookieObj[key] || ''
    }
    return ''
  }
  res.setCookie = function (key, value, options) {
    let opts = []
    if (options.maxAge) {
      opts.push(`max-age=${options.maxAge}`)
    }
    if (options.httpOnly) {
      opts.push(`httpOnly=${options.httpOnly}`)
    }
    if (options.signed) {
      value = value + '.' + signed(value)
    }
    let cookieValue = `${key}=${value}`
    cookies.push(`${cookieValue}; ${opts.join('; ')}`)
    res.setHeader('Set-Cookie', cookies)
  }
  const url = req.url
  if (url === '/buy') {
    const value = req.getCookie(cardName, {})
    if (value && session[value]) {
      // 第二次进来
      session[value].money -= 20
      res.end(`money ${session[value].money}`)
    } else {
      // 第一次进来
      const uid = uuid.v4()
      session[uid] = { money: 100 }
      res.setCookie(cardName, uid, { httpOnly: true })
      res.end('money 100')
    }
  } else {
    res.end('not found')
  }

})

server.listen(3000)