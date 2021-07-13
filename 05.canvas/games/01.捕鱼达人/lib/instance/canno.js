import { cannoInstance } from '../controller/index'
import { createInstance } from '../utils'
import Bullet from './bullet'
import { ctx } from '../index'

// 炮台类
class Canno {
  constructor(data, options = {}) {
    this.data = data
    // 炮台有分颜色 1-7
    this.type = options.type || 1
    // 安装
    this.install()
    // this.installCannoBase()
    // this.installCanno()
    // 安装炮弹
    // this.installBullte()
  }
  // 安装炮台底座
  installCannoBase = () => {
    cannoInstance.installCannoBase(this.data, this.type)
  }
  // 安装炮台
  installCanno = () => {
    cannoInstance.installCanno(this.data, this.type)
  }
  // 安装炮弹
  installBullte = () => {

  }
  install = () => {
    window.requestAnimationFrame(this.draw)
    // setInterval(() => {

    // }, 16)
  }
  draw = () => {
    const canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.installCannoBase()
    this.installCanno()
    window.requestAnimationFrame(this.install)
  }
}
export default Canno