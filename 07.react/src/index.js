import React from './react'
import ReactDOM from 'react-dom'

const element1 = <h1 className="title">hello <span>world</span></h1>
console.log(JSON.stringify(element1, null, 2))

/**
 * React.createElement(
  * "h1", 
  * {
          className: "title"
    }, 
    "hello ",
    React.createElement(
      "span",
       null,
      "world"
        ))

  JSX语法会被转换成 React.createElement的函数调用
 * h1 ---> 标签
 * {className: "title"} ---> 属性
   "hello " ---> 文本
   子元素同理
 */

ReactDOM.render(element1, document.getElementById('app'))