function* generator () {
  const a = yield 1
  console.log(a) // 1
  const b = yield 2
  console.log(b) // 2
  const c = yield 3
  console.log(c) // 3
}

/**
 * 计算规则:yield的次数 + 1 = next()的次数 = {value:undefined(函数的返回值),done:true(执行完毕为true)}
 * async/await 是generaotr + co的语法糖 co ==> express ==> koa ==> 同一作者
 */
const g = generator()
let { value, done } = g.next()
console.log(value, done, '第一次next') // {value:1,done:false}
value = g.next(value) // 1
console.log(value, '第二次next') // { value: 2, done: false }
value = g.next(value.value)
console.log(value, '第三次next') // { value: 3, done: false }
value = g.next(value.value)
console.log(value, '第四次next') // {value:undefined,done:true}
