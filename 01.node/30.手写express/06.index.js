const express = require('./06.动态参数路由实现-express/lib')
// const express = require('express')
// const pathToRegExp = require('path-to-regexp')
const app = express()
// 支持路由动态匹配,那么我们怎么去实现呢?
app.get('/home/:id/:key/zcf', function (req, res) {
  console.log(req.params) // { id: '1', key: '2' }
  res.end(JSON.stringify(req.params))
})

// 实现代码
// const keys = []
// const strReg = '/home/:id/:key/zcf'.replace(/\/:([^\/]+)/gi, function () {
//   keys.push(arguments[1])
//   return '/([^\\/]+)'
// })
// const url = '/home/1/2/zcf'
// const [, ...matches] = url.match(new RegExp(strReg))
// console.log(matches)// ['1', '2']
// const params = keys.reduce((p, c, i) => {
//   p[c] = matches[i]
//   return p
// }, {})
// console.log(params, 'params') // { id: '1', key: '2' }
// console.log(strReg, 'strReg') // /home/([^\/]+)/([^\/]+)/zcf
// console.log(keys, 'keys') // [ 'id', 'key' ]
// const reg = /^\/home\/([^\/]+)\/([^\/]+)\/zcf$/i
// const url = '/home/1/2/zcf'
// console.log(url.match(str))


/**
 * 实现原理:
 *    将路径转成正则去匹配
 *    1.把动态路径转换成正则
 *      const strReg = '/home/:id/:key/zcf'.replace(/\/:([^\/]+)/gi, function () {
          keys.push(arguments[1])
          return '/([^\\/]+)'
        })
        console.log(strReg, 'strReg') // /home/([^\/]+)/([^\/]+)/zcf
 *    2.然后根据转换后的正则匹配路径，提取里面的参数
        const url = '/home/1/2/zcf'
        const [, ...matches] = url.match(new RegExp(strReg))
        console.log(matches)['1', '2']
      3.通过方法处理一下，挂载到req.params上即可
        const params = keys.reduce((p, c, i) => {
          p[c] = matches[i]
          return p
        }, {})
        console.log(params, 'params') // { id: '1', key: '2' }
      4.像这种动态路由匹配路径获取参数的，有一个库已经做好了以上我们实现的，库名:path-to-regexp
        const keys = []
        const strReg = pathToRegExp('/home/:id/:key/zcf', keys)
        console.log(keys, 'keys') // [{ name: 'id', optional: false, offset: 7 }, { name: 'key', optional: false, offset: 22 }]
        console.log(strReg, 'strReg') // /^\/home\/(?:([^\/]+?))\/(?:([^\/]+?))\/zcf\/?$/i
 */
app.listen(3000)