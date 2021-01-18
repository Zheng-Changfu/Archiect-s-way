/**
 * 什么是回调函数?
 *    1. 你自己定义的
 *    2. 外界没有手动调用
 *    3. 最后自己触发了(达到某一个条件内部触发)
 *
 * 回调函数无处不在？
 *    优点: 可以满足大部分的企业需求
 *    缺点: 如果回调函数内部嵌套过多，会造成回调地狱问题
 *
 */
// 使用回调函数解决异步并发问题
// 比如node.js中读取文件我们使用异步读取,最后合并所有的打印结果返回,常规打印是同步的，所以打印可能为空
const fs = require('fs')
const path = require('path')


let saveFn = after(2, (obj) => {
  console.log(obj)
})

function after (count, callback) {
  // 闭包
  let obj = {}
  return function (key, value) {
    obj[key] = value
    if (--count === 0) {
      callback(obj)
    }
  }
}

fs.readFile(path.resolve(__dirname, './name.txt'), (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  saveFn('name', data.toString())
})
fs.readFile(path.resolve(__dirname, './age.txt'), (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  saveFn('age', data.toString())
})
