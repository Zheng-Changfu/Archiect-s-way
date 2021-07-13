import { ctx } from '../index'
class Bulltecontroller {
  constructor() {
    this.baseName = 'bullet'
    this.endType = 'png'
  }
  // 安装炮弹
  installBullte (data, type) {
    const key = `${this.baseName}${type}.${this.endType}`
    const info = data[key]
    this.drawBullte(info)
  }
  // 绘制炮弹
  drawBullte (info) {
    const { w, h, img, W, H } = info
    const x = (W - w) / 2 + 40, y = H - h
    // 要将炮弹绘制到炮台上
    ctx.drawImage(img, x, y, w, h)
  }

}
export default new Bulltecontroller