/**
 * 什么是发布订阅？
 *    把需要做的事情放入一个容器(订阅),等这件事情你想做的就把容器中的东西取出来然后去执行(发布)
 */
const fs = require('fs')
const path = require('path')
const person = {}
const events = {
  arr: [], // 容器
  // 订阅
  on (fn) {
    this.arr.push(fn)
  },
  // 发布
  emit () {
    this.arr.forEach(fn => fn())
  }
}
events.on(() => {
  if (Object.keys(person).length === 2) {
    console.log(person)
  }
})
fs.readFile(path.resolve(__dirname, './name.txt'), (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  person.name = data.toString()
  events.emit()
})
fs.readFile(path.resolve(__dirname, './age.txt'), (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  person.age = data.toString()
  events.emit()
})