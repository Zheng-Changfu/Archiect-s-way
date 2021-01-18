const Promise = require('./index')

// let p = new Promise((resolve, reject) => {
//   resolve(111)
// })
// p.then((value) => {
//   console.log(value) // 111
// }, reason => {
//   console.log(reason)
// })


/**
 * 这个代码我们现在还实现不了，因为我们定时器是异步的，所以resolve现在还执行不了
 * 接着我们去调用then方法，在这个时候我们进入then方法内部，发现promise的状态还是
 * pending状态，pending状态我们又没有处理，所以then方法等于空执行了一次
 * 接着等定时器的时间到了，我们去调用resolve函数仅仅改变了状态和存储了值而已，其他什么都没做
 * 
 * 解决思路:
 *    我们应该在promise状态为pending的时候，把then的两个回调放入一个容器中，接着等resolve函数
 *    调用的时候我们把容器中对应的回调函数拿出来去调用，是不是就可以实现了呢，这也是采用了发布订阅模式来解决这个问题
 */
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1111)
  })
})
p2.then(value => {
  console.log(value) // 1111
})