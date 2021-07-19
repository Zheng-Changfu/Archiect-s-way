import { ctx } from '../index'
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
    // 炮台动画帧
    this.frame = 0
    // 炮弹集合
    this.bulltes = []
    // 炮弹名称前缀
    this.bullteNamePrefix = 'bullet'
    // 炮弹名称后缀
    this.bullteNameEndfix = 'png'
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
    this.drawCanno(info, this.frame)
    this.imgInfo[key] = info
  }
  // 绘制炮台
  drawCanno = (info, frame) => {
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
      0, h / 5 * frame, w, h / 5,
      -w / 2, -(h / 10), w, h / 5
    )
    ctx.restore()
  }

  // 安装炮弹
  installBullte = (data, type) => {
  }
  // 绘制炮弹
  drawBullte = () => {

  }
}
export default new Cannocontroller