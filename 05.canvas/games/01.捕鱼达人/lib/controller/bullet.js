import { ctx } from '../index'
class Bulltecontroller {
  constructor() {
    this.baseName = 'bullet'
    this.endType = 'png'
    this.speed = 5
  }
  // 安装炮弹
  installBullte = (data, type, bulltes) => {
    const key = `${this.baseName}${type}.${this.endType}`
    const info = data[key]
    bulltes.forEach(bullte => {
      this.drawBullte(info, bullte)
    })
  }
  // 绘制炮弹
  drawBullte = (info, bullte) => {
    const { w, h, img, W, H } = info
    const { x, y, type, arc } = bullte
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(arc)
    // 要将炮弹绘制到炮台上
    ctx.drawImage(img, -w / 2, -h / 2, w, h)
    ctx.restore()
  }
  // 发射炮弹
  launchBullte (bulltes) {
    bulltes.forEach(bullet => {
      // 已知角度，自定义速度(斜边)，求对边和临边
      const x = Math.sin(bullet.arc) * this.speed
      const y = Math.cos(bullet.arc) * this.speed
      bullet.x += x
      bullet.y -= y
    })
  }

}
export default new Bulltecontroller