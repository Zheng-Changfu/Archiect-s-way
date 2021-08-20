# React 学习笔记

## 1.JSX

> 是一种 JS 和 HTML 混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件

## 2. 语法转换图分析

### 2.1 源代码

![](./assets/jsx-source-code.png)

### 2.2 编译时经过 babel 转换后的代码

![](./assets/jsx-babel-transform-code.png)

### 2.3 转换后代码说明

![](./assets/jsx-babel-transform-code-explain.png)

### 3. React.createElement 返回值

> 返回值是一个 js 对象(虚拟 DOM)，描述了真实 DOM 的信息
> ![](./assets/react.createment-returns.png)

### 4. 实现 React.creatElement
```js
function createElement(){
  
}
```