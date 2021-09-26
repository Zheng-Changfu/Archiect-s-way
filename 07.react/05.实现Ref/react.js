import { wrapToVdom } from "./utils"
import { REACTFORWARDREF } from './constants'
import Component from './Component'
/**
 * @description 创建一个React元素
 * @param {*} type 元素标签
 * @param {*} config 元素配置，包含ref,key,children。。。。
 * @param {*} children 子配置
 * @returns vDom
 */
function createElement (type, config, children) {
  let ref = null // 标识元素
  let key = null // 元素的唯一key
  if (config) {
    delete config.__self
    delete config.__source
    ref = config.ref
    key = config.key
    delete config.ref
    delete config.key
  }
  let props = { ...config }
  if (arguments.length > 3) {
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom)
  } else {
    props.children = wrapToVdom(children)
  }
  return { type, ref, key, props }
}

function createRef () {
  return { current: null }
}

/**
 * @description 转发ref到函数组件上
 * @param {*} render 函数本身
 * @returns 对象
 */
function forwardRef (render) {
  return {
    $$typeof: REACTFORWARDREF,
    render
  }
}

const React = {
  createElement,
  createRef,
  forwardRef,
  Component
}

export default React