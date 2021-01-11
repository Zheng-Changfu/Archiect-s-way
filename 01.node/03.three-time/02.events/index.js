const Events = require('./myEvents')
const event = new Events()
/**
 * newListener 是events事件监听器自带的，每次绑定一个事件后都会触发newListener对应的回调函数
 */
// event.on('newListener', (event, listener) => {
//   console.log(event, listener)
// })
// event.on('newListener', (event, listener) => {
//   console.log(event, listener)
// })
event.on('test', value => {
  console.log(value)
})
event.once('test2', (...args) => {
  console.log('只触发一次', ...args)
})
event.emit('test2', 1231, 111)
event.emit('test2', 2113, 222)
// event.emit('test', '吃')
// event.emit('test', '喝')
// event.emit('test', '玩')