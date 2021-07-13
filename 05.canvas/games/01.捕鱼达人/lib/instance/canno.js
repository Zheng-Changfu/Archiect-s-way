import { cannoInstance } from '../controller/index'
import { createInstance } from '../utils'
import Bullet from './bullet'

// 炮台类
class Canno {
  constructor(data, options = {}) {
    this.data = data
    // 炮台有分颜色 1-7
    this.type = options.type || 1
    // 安装
    this.installCannoBase()
    this.installCanno()
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
    const bullteInstance = this.bullteInstance
      ? this.bullteInstance
      : createInstance(Bullet, this.data, { type: this.type })
    bullteInstance.installBullte()
    this.bullteInstance = bullteInstance
  }
}
export default Canno