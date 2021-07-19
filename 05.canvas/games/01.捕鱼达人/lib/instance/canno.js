import { cannoInstance } from '../controller/index'
<<<<<<< HEAD
=======
import { createInstance, registerListener } from '../utils'
>>>>>>> 652c38b29ccb3ec4e778d400cad96402c51c6059
import { ctx } from '../index'
import bullet from '../controller/bullet'

// 炮台类
class Canno {
  constructor(data, options = {}) {
    this.data = data
    // 炮台有分颜色 1-7
    this.type = options.type || 1
    this.addBullte()
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
<<<<<<< HEAD
=======
  }
  // 添加炮弹
  addBullte = () => {
    registerListener('click', ctx.canvas, () => {
      cannoInstance.addBullte()
      cannoInstance.setFrame()
    })
>>>>>>> 652c38b29ccb3ec4e778d400cad96402c51c6059
  }
  install = () => {
    window.requestAnimationFrame(this.draw)
  }
  draw = () => {
    const canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
<<<<<<< HEAD
    // 绘制顺序层级关系 : 后面覆盖前面
=======
    // 绘制顺序，后面会覆盖前面
>>>>>>> 652c38b29ccb3ec4e778d400cad96402c51c6059
    this.installCannoBase()
    this.installBullte()
    this.installCanno()
    window.requestAnimationFrame(this.install)
  }
}
export default Canno