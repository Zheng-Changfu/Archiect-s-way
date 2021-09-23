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

## 3. React.createElement 返回值

> 返回值是一个 js 对象(虚拟 DOM)，描述了真实 DOM 的信息
> ![](./assets/react.createment-returns.png)

## 4. 实现 React.creatElement

```js
const REACT_TEXT = Symbol("REACT_TEXT");
const wrapToVdom = (element) => {
  return typeof element === "string" || typeof element === "number"
    ? { type: REACT_TEXT, props: { content: element } }
    : element;
};
/**
 * @description 创建一个React元素
 * @param {*} type 元素标签
 * @param {*} config 元素配置，包含ref,key,children。。。。
 * @param {*} children 子配置
 * @returns vDom
 */
function createElement(type, config, children) {
  let ref = null; // 标识元素
  let key = null; // 元素的唯一key
  if (config) {
    delete config.__self; // 删除babel添加的辅助性标识
    delete config.__source; // 删除babel添加的辅助性标识
    ref = config.ref;
    key = config.key;
    delete config.ref;
    delete config.key;
  }
  let props = { ...config };
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }
  return { type, ref, key, props };
}

const React = {
  createElement,
};

export default React;
```

![](/assets/React.createElement-code-process.png) 

## 5. 实现 ReactDOM.render

```js
# 将虚拟DOM转换成真实DOM并挂载到指定容器中
const REACT_TEXT = Symbol("REACT_TEXT");
function render (vDom, container) {
  return mount(vDom, container)
}
/**
 * @description 将虚拟dom创建成真实dom挂载到指定父容器上
 * @param {*} vDom 虚拟dom
 * @param {*} parentDOM 父容器
 */
function mount (vDom, parentDOM) {
  const dom = createDOM(vDom)
  if (dom) {
    return parentDOM.appendChild(dom)
  }
}
/**
 * @description 根据虚拟dom创建真实dom
 * @param {*} vDom 虚拟dom
 * @returns 真实dom
 */
function createDOM (vDom) {
  if (!vDom) return null
  const { type, props } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else {
    dom = document.createElement(type)
  }
  if (props) {
    updateProps(dom, {}, props)
    const child = props.children
    if (child) {
      if (typeof child === 'object' && child.type) {
        // 对象
        mount(child, dom)
      } else if (Array.isArray(child)) {
        // 数组
        reconcileChildren(child, dom)
      }
    }
  }
  return dom
}
/**
 * @description 批量挂载子节点
 * @param {*} child 子元素集合
 * @param {*} parentDOM 父元素
 */
function reconcileChildren (child, parentDOM) {
  for (let i = 0; i < child.length; i++) {
    mount(child[i], parentDOM)
  }
}
/**
 * 
 * @description 添加属性，diff对比
 * @param {*} dom 真实元素
 * @param {*} oldProps 旧属性
 * @param {*} newProps 新属性
 */
function updateProps (dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      // 子节点单独处理
      continue
    } else if (key === 'style') {
      for (let styleKey in newProps[key]) {
        // 添加样式
        dom.style[styleKey] = newProps[key][styleKey]
      }
    } else {
      // 其他属性
      dom[key] = newProps[key]
    }
  }
}
const ReactDOM = {
  render
}
export default ReactDOM
```

![](/assets/React.render-code-process.png) 

## 6. 实现函数式组件

```js
# 示例
import React from './react'
import ReactDOM from './react-dom'

function FunctionComponent (props) {
  return <h1>hello {props.title}</h1>
}

ReactDOM.render(<FunctionComponent title='world' />, document.getElementById('app'))

# 实现
function createDOM (vDom) {
  if (!vDom) return null
  const { type, props } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
      // 挂载函数式组件
    return mountFunctionComponent(vDom)
  } else {
    dom = document.createElement(type)
  }

  if (props) {
    updateProps(dom, {}, props)
    const child = props.children
    if (child) {
      if (typeof child === 'object' && child.type) {
        // 对象
        mount(child, dom)
      } else if (Array.isArray(child)) {
        // 数组
        reconcileChildren(child, dom)
      }
    }
  }
  return dom
}

/**
 * 
 * @param {*} vDom 虚拟Dom
 * @returns 真实dom
 */
function mountFunctionComponent (vDom) {
  const { type: FunctionComponent, props } = vDom
  const renderVdom = FunctionComponent(props)
  // 添加旧的虚拟dom，方便后期去做diff
  vDom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}
```

## 7. 实现类组件

```js
# 示例
import React from './react'
import ReactDOM from './react-dom'

class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
  }
  render () {
    console.log(this, 'this')
    return <h1>hello {this.props.title}</h1>
  }
}
ReactDOM.render(<ClassComponent title='world' />, document.getElementById('app'))

# 实现
class Component {
  // 此标识用来区分为类组件还是函数式组件
  static isReactComponent = true
  constructor(props) {
    this.props = props // 添加props属性
  }
}
export default Component
/**
 * @description 根据虚拟dom创建真实dom
 * @param {*} vDom 虚拟dom
 * @returns 真实dom
 */
function createDOM (vDom) {
  if (!vDom) return null
  const { type, props } = vDom
  let dom
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 类组件
      return mountClassComponent(vDom)
    } else {
      // 函数组件
      return mountFunctionComponent(vDom)
    }

  } else {
    dom = document.createElement(type)
  }

  if (props) {
    updateProps(dom, {}, props)
    const child = props.children
    if (child) {
      if (typeof child === 'object' && child.type) {
        // 对象
        mount(child, dom)
      } else if (Array.isArray(child)) {
        // 数组
        reconcileChildren(child, dom)
      }
    }
  }
  return dom
}
/**
 * 
 * @param {*} vDom 虚拟Dom
 * @returns 真实dom
 */
function mountClassComponent (vDom) {
  const { type: ClassComponent, props } = vDom
  const instance = new ClassComponent(props)
  const render = instance.render
  const renderVdom = render.call(instance)
  // 添加旧的虚拟dom，方便后期去做diff
  vDom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}
```

