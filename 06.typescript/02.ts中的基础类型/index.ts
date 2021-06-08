// 布尔
let bool: boolean = true

// 数字
let num: number = 2

// 字符串
let str: string = '2'

// 元祖,类型一一对应
let tuple: [string, number, boolean] = ['2', 2, true]
tuple.push(false)
tuple.push(2)
tuple.push('str')
// tuple.push(null)  error 只能增加元祖中存放中存放的类型

// 数组
let arr1: string[] = ['1', '2']
let arr2: number[] = [1, 2, 3]
let arr3: (string | number)[] = [2, '1', '3']

// 枚举,分为3种
// 1. 普通枚举
enum Role {
  USER,
  ADMIN,
  PERMISSION
}
/**
 * {
    '0': 'USER',
    '1': 'ADMIN',
    '2': 'PERMISSION',
    USER: 0,
    ADMIN: 1,
    PERMISSION: 2
  }
 */
// console.log(Role)
// console.log(Role[0]) // 可以通过key拿到对应的常量值
// console.log(Role.USER) // 也可以通过常量值拿到对应的key

// 2. 异构枚举
enum UserRole {
  USER = 'user',
  ADMIN = 200,
  PERMISSION
}
/**
 * {
    '200': 'ADMIN',
    '201': 'PERMISSION',
    USER: 'user',
    ADMIN: 200,
    PERMISSION: 201
   }
 */
// console.log(UserRole)

// 3. 常量枚举
const enum User_Role {
  USER,
  ADMIN,
  PERMISSION
}
// console.log(User_Role) error
console.log(User_Role.USER) // 0

// any
let any: any = '1'
any = 2 // 不进行类型检测

// null
let name1: null = null
console.log(name1)

// undefined
let str1: undefined = undefined
console.log(str1)

// void
let a: void
// a = 2 error 只能赋值null/undefined,严格模式下不能将null赋值给void
// a = null
// a = undefined

// never,不会出现的值，不能把其他类型赋值给never
function fn(x: number | string) {
  if (typeof x === 'number') {
    // xx
  } else if (typeof x === 'string') {
    // xxx
  } else {
    // never
    console.log(x)
  }
}
// fn(2)

// Symbol,表示独一无二
let s1: Symbol = Symbol('key')
let s2: Symbol = Symbol('key')
console.log(s1 === s2) // false

// BigInt
const n1 = Number.MAX_SAFE_INTEGER + 1
const n2 = Number.MAX_SAFE_INTEGER + 2
console.log(n1 === n2) // true
const n3: bigint = BigInt(Number.MAX_SAFE_INTEGER)
console.log(n3 + BigInt(1) === n3 + BigInt(2)) // false

// object,表示非原始类型
let o1: object = function () { }
o1 = {}
o1 = []
// o1 = 2 error