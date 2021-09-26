# React 学习笔记

## 1.JSX

> 是一种 JS 和 HTML 混合的语法,将组件的结构、数据甚至样式都聚合在一起定义组件

## 2. 语法转换图分析

### 2.1 源代码

![](./assets/jsx-source-code.png) 

### 2.2 编译时 babel 转换后的代码

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

## 8. 实现合成事件和批量更新状态

> 在实现之前，我们先看看让刚入门react的童鞋们疑惑的代码

### 8.1 代码1

```js
class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
    this.state = {
      num: 0
    }
  }
  handleClick = () => {
    console.log(this.state.num, '0')
    this.setState({
      num: this.state.num + 1
    })
    console.log(this.state.num, '1')
    this.setState({
      num: this.state.num + 1
    })
    console.log(this.state.num, '2')
  }
  render () {
    return <div>
      <h1>{this.state.num}</h1>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}
```

![](/assets/React.setState-code-1.png) 

### 8.2 代码2

```js
class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
    this.state = {
      num: 0
    }
  }
  handleClick = () => {
    console.log(this.state.num, '0')
    this.setState(state => ({ num: state.num + 1 }))
    console.log(this.state.num, '1')
    this.setState(state => ({ num: state.num + 1 }))
    console.log(this.state.num, '2')
  }
  render () {
    return <div>
      <h1>{this.state.num}</h1>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}
```

![](/assets/React.setState-code-2.png) 

### 8.3 代码3

```js
class ClassComponent extends React.Component {
  constructor(props) {
    super(props) // 调用父类的constructor方法
    this.state = {
      num: 0
    }
  }
  handleClick = () => {
    setTimeout(() => {
      console.log(this.state.num, '0')
      this.setState({
        num: this.state.num + 1
      })
      console.log(this.state.num, '1')
      this.setState({
        num: this.state.num + 1
      })
      console.log(this.state.num, '2')
    })
  }
  render () {
    return <div>
      <h1>{this.state.num}</h1>
      <button onClick={this.handleClick}>+</button>
    </div>
  }
}
```

![](/assets/React.setState-code-3.png) 

> 是不是感到非常的奇怪，接下来让我们动动手一起去实现吧，实现之后相信大家的疑惑都会被解开的

### 8.4 实现setState

```js
# 实际上setState在React可以管辖到的地方只是将状态存起来了（并不会进行页面上的更新），等到后面触发生命周期/合成事件时在执行真正的更新
const updateQueue = {
  // 是否为批量更新模式,此变量控制了更新模式
  isBatchingUpdate: false,
  updaters: [],
  batchUpdate () {
    // 批量更新
    for (let i = 0; i < updateQueue.updaters.length; i++) {
      const update = updateQueue.updaters[i]
      update.updateComponent()
    }
    // 重置
    updateQueue.updaters.length = 0
    updateQueue.isBatchingUpdate = false
  }
}
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance
    this.pendingStates = []
  }
  addState (partialState) {
    this.pendingStates.push(partialState)
    this.emitUpdate()
  }
  emitUpdate () {
    const isBatchingUpdate = updateQueue.isBatchingUpdate
    if (isBatchingUpdate) {
      // 如果为批量更新模式，就将更新器都先存起来
      updateQueue.updaters.push(this)
    } else {
      // 去更新
      this.updateComponent()
    }
  }
  updateComponent () {
    const { classInstance, pendingStates } = this
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, this.getState())
    }
  }
  getState () {
    const { classInstance, pendingStates } = this
    let state = classInstance.state
    for (let i = 0; i < pendingStates.length; i++) {
      let pendingState = pendingStates[i]
      if (isFunc(pendingState)) {
        // this.setState((state) => ({num:state.num + 1}))
        pendingState = pendingState(state)
      }
      // 状态合并
      state = { ...state, ...pendingState }
    }
    this.pendingStates.length = 0
    return state
  }
}

function shouldUpdate (classInstance, nextState) {
  // 更新外界状态
  classInstance.state = nextState
  // 更新
  classInstance.forceUpdate()
}
class Component {
  // 此标识用来区分为类组件还是函数式组件
  static isReactComponent = true
  constructor(props) {
    /**
     * 这里的this指向的继承者组件，因为外界是super()
     */
    this.props = props
    this.state = {}
    this.updater = new Updater(this)
  }
  setState (partialState) {
    this.updater.addState(partialState)
  }
  forceUpdate () {
    const oldRenderVdom = this.oldRenderVdom
    const oldDom = findDOM(oldRenderVdom)
    const newVdom = this.render() // 这里的this指向组件实例
    compareTwoVDom(oldDom.parentNode, oldRenderVdom, newVdom)
    this.oldRenderVdom = newVdom
  }
}
/**
 * @description diff比较，暂时没有写
 * @param {*} parentNode 父节点
 * @param {*} oldVDom 老的虚拟dom
 * @param {*} newVDom 新的虚拟dom
 */
function compareTwoVDom (parentNode, oldVDom, newVDom) {
  const oldDom = findDOM(oldVDom)
  const newDom = createDOM(newVDom)
  parentNode.replaceChild(newDom, oldDom)
}

/**
 * 
 * @param {*} vDom 虚拟dom
 * @returns 根据虚拟dom找到对应的真实dom
 */
function findDOM (vDom) {
  // 递归
  // if (!vDom) return null
  // if (vDom.dom) {
  //   // 真实元素
  //   return vDom.dom
  // } else {
  //   // 组件就继续找
  //   return findDOM(vDom.oldRenderVdom)
  // }

  // 迭代
  const stack = [vDom]
  while (stack.length) {
    const vdom = stack.pop()
    if (!vdom) return null
    if (vdom.dom) return vdom.dom
    stack.push(vdom.oldRenderVdom)
  }
}
```

### 8.5 实现合成事件

```js
// dom上如果绑定了事件，就会先进入此方法
function addEvent (dom, eventName, eventHandle) {
  let _store
  // 给dom上添加自定义属性，方便dispatchEvent中去触发
  if (dom._store) {
    _store = dom._store
  } else {
    dom._store = {}
    _store = dom._store
  }
  // _store.onclick = handleClick
  _store[eventName] = eventHandle
  // 将状态都统一存放在document上
  if (!document[eventName]) {
    // document.onclick = dispatchEvent
    document[eventName] = dispatchEvent
  }
}

/**
 * @description 不管点什么按钮，触发什么事件，走的都是这个函数
 * @description 本质其实就一个切片函数，在执行用户的回调前开启批量更新模式，执行用户回调函数，关闭批量更新模式
 * @param {*} nativeEvent 原生event
 */
function dispatchEvent (nativeEvent) {
  // event.target = 当前点击的元素 button
  // event.type = 当前的事件名 click
  // event.currentTarget = 向上冒泡时的目标
  const { target, type } = nativeEvent
  const eventName = 'on' + type
  // 开启批量更新模式
  updateQueue.isBatchingUpdate = true
  // 创建合成event
  const syntheticEvent = createSyntheticEvent(nativeEvent)
  let currentTarget = target
  // 模拟向上冒泡的过程
  while (currentTarget) {
    // 拿到当前dom上的_store属性，只要dom上绑定了react的事件，react就会在这个dom上挂一个_store属性
    const _store = currentTarget._store
    // 拿到在_store属性上绑定的函数(用户的函数)
    const eventHandle = _store && _store[eventName]
    if (isFunc(eventHandle)) {
      syntheticEvent.target = target
      syntheticEvent.currentTarget = currentTarget
      // 调用用户的函数
      eventHandle.call(target, syntheticEvent)
    }
    currentTarget = currentTarget.parentNode
  }
  // 关闭批量更新
  updateQueue.isBatchingUpdate = false
  // 执行真正的更新
  updateQueue.batchUpdate()
}
// nativeEvent为原生的event，react在这里做了一些其他处理
function createSyntheticEvent (nativeEvent) {
  // 在这里可以做兼容性处理
  let syntheticEvent = { nativeEvent }
  for (let key in nativeEvent) {
    syntheticEvent[key] = nativeEvent[key]
  }
  return syntheticEvent
}
```

### 8.6 面试题：setState什么时候是同步，什么时候是异步？

- React能管辖到的地方就是异步的，比如合成事件中，生命周期中都是异步的
- React管辖不到的地方都是同步的，比如异步代码，如：原生事件、Promise.then、setTimeout...等都是同步的
- 内部通过一个`isBatchingUpdate`变量来控制是否为批量更新模式

## 9. 实现Ref

### 9.1 实现react元素上的ref

```js
# 示例
class ClassTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.aRef = React.createRef();
    this.bRef = React.createRef();
    this.resultRef = React.createRef();
  }
  handleAdd = () => {
    const aValue = this.aRef.current.value;
    const bValue = this.bRef.current.value;
    this.resultRef.current.value = aValue + bValue;
  };
  render() {
    return (
      <div>
        <input type="text" ref={this.aRef} />+<br />
        <input type="text" ref={this.bRef} />
        <button onClick={this.handleAdd}>=</button>
        <br />
        <input type="text" ref={this.resultRef} />
        <br />
      </div>
    );
  }
}
ReactDOM.render(<ClassTestRef />, document.getElementById("app"));

# 实现
// react.js中
function createRef () {
  return { current: null }
}
// react-dom.js中
export function createDOM (vDom) {
  ...
  vDom.dom = dom
  if (ref) {
    // 指向真实DOM
    ref.current = dom
  }
  return dom
}
```

### 9.2 实现类组件上的ref

```js
# 示例
class Instance extends React.Component {
  constructor() {
    super();
    this.aRef = React.createRef();
    this.bRef = React.createRef();
    this.resultRef = React.createRef();
  }

  handleAdd = () => {
    const aValue = this.aRef.current.value;
    const bValue = this.bRef.current.value;
    this.resultRef.current.value = aValue + bValue;
  };

  render() {
    return (
      <div>
        <input type="text" ref={this.aRef} />+<br />
        <input type="text" ref={this.bRef} />
        <br />
        <input type="text" ref={this.resultRef} />
        <br />
      </div>
    );
  }
}
class ClassInstanceTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.instanceRef = React.createRef();
  }
  handleAdd = () => {
    this.instanceRef.current.handleAdd();
  };
  render() {
    return (
      <div>
        <Instance ref={this.instanceRef} />
        <button onClick={this.handleAdd}>=</button>
      </div>
    );
  }
}
ReactDOM.render(<ClassInstanceTestRef />, document.getElementById("app"));

# 实现
// react.js中
function createRef () {
  return { current: null }
}

// react-dom.js中
function mountClassComponent (vDom) {
  ...
  instance.oldRenderVdom = vDom.oldRenderVdom = renderVdom
  if (ref) {
    ref.current = instance
  }
  return createDOM(renderVdom)
}
```

### 9.3 实现函数组件上的ref

```js
# 示例
function Func(props, ref) {
  return <input type="text" ref={ref} />;
}
// 转发ref到Func中
const ForwardFunc = React.forwardRef(Func);
class FuncTestRef extends React.Component {
  constructor(props) {
    super(props);
    this.instanceRef = React.createRef();
  }
  handleFocus = () => {
    this.instanceRef.current.focus();
  };
  render() {
    return (
      <div>
        {/* 需要使用forwardRef包裹一下 */}
        <ForwardFunc ref={this.instanceRef} />
        <button onClick={this.handleFocus}>获取焦点</button>
      </div>
    );
  }
}
ReactDOM.render(<FuncTestRef />, document.getElementById("app"));

# 实现
// react.js中
function createRef () {
  return { current: null }
}
// react-dom.js中
const REACTFORWARDREF = Symbol('react.forward_ref')
function createDOM (vDom) {
  ...
  if (type === REACT_TEXT) {
    dom = document.createTextNode(props.content)
  } else if (type.$$typeof === REACTFORWARDREF) {
    // forwardRef
    return mountForwardComponent(vDom)
  } else if (typeof type === 'function') {
    ...
  }
  ...
}
function mountForwardComponent (vDom) {
  const { type: FunctionComponent, props, ref } = vDom
  const renderVdom = FunctionComponent.render(props, ref)
  // // 添加旧的虚拟dom，方便后期去做diff
  vDom.oldRenderVdom = renderVdom
  return createDOM(renderVdom)
}  
```

### 9.4 总结Ref

- 在React元素上的ref，current指向真实的dom元素
- 在类组件上的ref，current指向类组件实例
- 在函数组件上的ref，需要使用`React.forwardRef包裹一层函数来达到转发ref的效果`，然后指向转发后ref被使用时的dom元素或实例

## 10. 实现生命周期

