import { ctx } from '../index'
import Bullte from './bullet'
import bullet from './bullet'
class Cannocontroller {
  constructor() {
    // 底座名称
    this.baseName = 'bottom-bar.png'
    // 炮台名称前缀
    this.cannoNamePrefix = 'cannon'
    // 炮台名称后缀
    this.cannoNameEndFix = 'png'
    // 图片详情
    this.imgInfo = {}
    // 
    this.frame = 0
    this.bulltes = [] // {type:?,x:?,y:?,arc:?}
    this.positionInfo = {}
  }
  // 安装炮台底座
  installCannoBase = (data, options) => {
    const info = data[this.baseName]
    this.drawCannoBase(info)
    this.imgInfo[this.baseName] = info
  }
  // 绘制底座
  drawCannoBase = (info) => {
    const { w, h, img, W, H } = info
    // 绘制到底部中心
    const x = (W - w) / 2, y = H - h + 2
    ctx.drawImage(img, x, y, w, h)
  }

  // 安装炮台
  installCanno = (data, type) => {
    const key = `${this.cannoNamePrefix}${type}.${this.cannoNameEndFix}`
    const info = data[key]
    this.drawCanno(info)
    this.imgInfo[key] = info
    this.positionInfo.type = type
  }
  // 绘制炮台
  drawCanno = (info) => {
    /*
        计算弧度:
          1. 我们知道炮台中心点位置 a
          2. 我们知道鼠标移动位置 b
          3. 炮台是垂直于canvas的
          4. 弧度 === tan(对边 / 临边)
    */
    const { w, h, img, W, H, handlesInfo: { mousemove } } = info
    const canvas = ctx.canvas
    const offsetLeft = canvas.offsetLeft
    const offsetTop = canvas.offsetTop
    const x = (W - w) / 2 + 43, y = H - h / 4 + 20
    const a = x + offsetLeft - mousemove.x + w / 2
    const b = y + offsetTop - mousemove.y
    const arc = Math.atan2(b, a) - Math.PI / 2
    ctx.save()
    ctx.translate(x + w / 2, y + h / 10)
    ctx.rotate(arc)
    ctx.drawImage(
      img,
      0, h / 5 * this.frame, w, h / 5,
      -w / 2, -(h / 10), w, h / 5
    )
    ctx.restore()
    this.positionInfo = {
      ...this.positionInfo,
      x: x + w / 2,
      y: y + h / 10,
      arc
    }
  }

  // 安装炮弹/发射炮弹
  installBullte = (data, type) => {
    // 安装炮弹
    Bullte.installBullte(data, type, this.bulltes)
    // 发射炮弹
    Bullte.launchBullte(this.bulltes)
  }

  // 添加炮弹
  addBullte = () => {
    this.bulltes.push(this.positionInfo)
  }

  // 控制炮台发送炮弹动画
  setFrame = () => {
    window.requestAnimationFrame(this.transition)
  }
  transition = () => {
    this.frame++
    if (this.frame >= 5) {
      this.frame = 0
      return
    }
    window.requestAnimationFrame(this.setFrame)
  }
}
export default new Cannocontroller