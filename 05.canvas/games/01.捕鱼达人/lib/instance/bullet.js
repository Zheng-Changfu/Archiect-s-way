import { bulletInstance } from '../controller/index'
// 炮弹类
class Bullet {
  constructor(data, options = {}) {
    this.data = data
    this.type = options.type || 1
  }
  // 安装炮弹
  installBullte = () => {
    bulletInstance.installBullte(this.data, this.type)
  }
}
export default Bullet