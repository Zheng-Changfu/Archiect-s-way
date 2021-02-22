/**
 * 思路:
 *    派发生成一个签名（加盐摘要算法），客户端每次发送请求的时候会携带这些cookie，然后服务端根据签名进行校验，如果两次结果都一样，
 *    说明没有被篡改，可以通过，jsonwebtoken原理也是一样
 *  优点: 客户端不能通过代码或者Application篡改，相对来说，比较安全
 *  缺点: 还是以明文的方式展现在客户端中，所以不能有一些敏感信息
 */
const http = require('http')
const queryString = require('querystring')
const crypto = require('crypto')
const key = 'zcf'
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
        // 同样的盐值摘要会得到相同的结果
        const [value, sign] = cookieObj[key].split('.')
        if (signed(value) === sign) {
          // 说明没有被修改
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
    // 派发签名
    if (options.signed) {
      value = value + '.' + signed(value)
    }
    let cookieValue = `${key}=${value}`
    cookies.push(`${cookieValue}; ${opts.join('; ')}`)
    res.setHeader('Set-Cookie', cookies)
  }
  const url = req.url
  if (url === '/read') {
    const value = req.getCookie('name', { signed: true })
    res.end(value)
  } else if (url === '/write') {
    // httpOnly设置为true只能防止代码的方式（document.cookie）不能修改
    // 如果直接在Application中更改我们是没办法阻止的，不安全
    res.setCookie('name', 'zcf', {
      maxAge: 10,
      httpOnly: true,
      signed: true // 是否进行签名
    })
    res.setCookie('age', '19', {
      httpOnly: true,
      signed: true // 是否进行签名
    })
    res.end('write ok')
  } else {
    res.end('not found')
  }
})

server.listen(3000)