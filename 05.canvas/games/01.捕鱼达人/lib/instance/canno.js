import { cannoInstance } from '../controller/index'
import { ctx } from '../index'

// 炮台类
class Canno {
  constructor(data, options = {}) {
    this.data = data
    // 炮台有分颜色 1-7
    this.type = options.type || 1
    // 安装
    this.install()
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
    cannoInstance.installBullte(this.data, this.type)
  }
  install = () => {
    window.requestAnimationFrame(this.draw)
  }
  draw = () => {
    const canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 绘制顺序层级关系 : 后面覆盖前面
    this.installCannoBase()
    this.installBullte()
    this.installCanno()
    window.requestAnimationFrame(this.install)
  }
}
export default Canno