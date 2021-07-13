import bottomJson from '../json/bottom.json'
import bulletJson from '../json/bullet.json'
import webJson from '../json/web.json'
const res = [bottomJson, bulletJson, webJson]
export const initRequestData = ({ ctx: _ctx, W, H, handlesInfo }) => {
  let count = 0
  let total = res.reduce((p, { frames }) => p + Object.keys(frames).length, 0)
  return new Promise((resolve) => {
    const result = res.reduce((p, c) => {
      const { frames } = c
      Object.keys(frames).forEach(key => {
        const { frame: { x, y } } = frames[key]
        const img = new Image()
        img.src = `../01.捕鱼达人/images/${key}`
        img.onload = function () {
          count++;
          p[key] = {
            x,
            y,
            w: img.width,
            h: img.height,
            img,
            ctx: _ctx,
            W,
            H,
            handlesInfo
          }
          if (count === total) {
            loadResolve()
          }
        }
      })
      return p
    }, {})

    function loadResolve () {
      resolve(result)
    }
  })
}

