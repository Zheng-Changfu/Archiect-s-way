const http = require('http')
const url = require('url')
// curl可以发送请求
const server = http.createServer((req, res) => {
  // --------------  请求首行 -------------
  console.log(req.method) // 请求方式默认是大写的 GET
  console.log(req.url) // /test?a=b
  const { pathname, query } = url.parse(req.url, true) // true会将query变成对象格式
  console.log(pathname, query) // pathname = /test  query = { a: 'b' }
  console.log(req.httpVersion) // http协议版本，http本质是基于tcp协议的，在tcp的基础上增加了内容，然后进行分割，放到req/res上面的

  // --------------  请求头 -------------
  console.log(req.headers) // key都是小写的

  // --------------  请求体 -------------
  // console.log(req.body)
  // req是一个可读流
  // res是一个可写流

  // 因为chrome浏览器采用的是gbk编码，后台返回的是utf-8编码，所以会乱码
  // 解决乱码方式：设置响应头告诉浏览器要采用utf-8的方式
  // 这里的utf-8也可以简写utf8,但是ie不支持这么写
  res.setHeader('Content-type', 'text/html;charset=utf-8')
  res.write('你好啊啊')
  res.write('你好啊啊')
  res.write('你好啊啊')
  // end中不能写入数字，因为res是一个可写流，可写流内部是读取buffer进行拼接，buffer内部不可以放入数字
  res.end("112123123123")
})

server.listen(3000)