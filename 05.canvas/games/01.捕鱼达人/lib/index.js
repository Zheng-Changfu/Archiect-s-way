/**
 * 入口
 */
import { initRequestData } from './api'
import { initAllInstance } from './instance/index'
import { createInstance, registerListener } from './utils'
export let ctx
async function init () {
  // 初始化canvas
  const { ctx: _ctx, W, H, handlesInfo } = initCanvas('fishing')
  // 初始化数据
  const data = await initRequestData({ ctx: _ctx, W, H, handlesInfo })
  ctx = _ctx
  // 初始化类
  const { Canno } = initAllInstance()
  // 创建炮台实例
  createInstance(Canno, data)
}
init()

function initCanvas (id) {
  const canvas = document.getElementById(id)
  const ctx = canvas.getContext('2d')
  // 注册事件
  const handlesInfo = registerListener('mousemove', canvas)
  return {
    ctx,
    W: canvas.width,
    H: canvas.height,
    handlesInfo
  }
}


