// babel编译后代码
"use strict";


// 自己实现方法

class Context {
  constructor() {
    this.done = false
  }
  stop () {
    this.done = true
  }
}
let regeneratorRuntime = {
  mark: function (generatorFn) {
    return generatorFn
  },
  wrap: function (innerFn, outerFn) {
    // generator函数返回的是一个对象，对象上面有我们想要的next方法
    let it = {}
    // 创建一个上下文
    const context = new Context()
    it.next = function (val) {
      let value = innerFn(val)
      // 调用next函数返回的是一个对象，该对象上面有value和done属性{value,done}
      return {
        value,
        done
      }
    }
    return it
  }
}
var _marked = regeneratorRuntime.mark(generator);

function generator () {
  var a, b, c;
  return regeneratorRuntime.wrap(function generator$ (_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          a = _context.sent;
          console.log(a); // 1

          _context.next = 6;
          return 2;

        case 6:
          b = _context.sent;
          console.log(b); // 2

          _context.next = 10;
          return 3;

        case 10:
          c = _context.sent;
          console.log(c); // 3

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var g = generator();

var _g$next = g.next(),
  value = _g$next.value,
  done = _g$next.done;

console.log(value, done, '第一次next'); // {value:1,done:false}

value = g.next(value); // 1

console.log(value, '第二次next'); // { value: 2, done: false }

value = g.next(value.value);
console.log(value, '第三次next'); // { value: 3, done: false }

value = g.next(value.value);
console.log(value, '第四次next'); // {value:undefined,done:true}