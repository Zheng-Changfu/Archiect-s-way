/**
 * 工具函数
 */
export const createInstance = (instance, options = {}) => {
  return new instance(options)
}
export const deg2Arc = (deg) => {
  return deg * (Math.PI / 180)
}
export const arc2Deg = (arc) => {
  return arc * (180 / Math.PI)
}
export function registerListener (eventName, el, cb) {
  let handles = {
    mousemove: {},
    click: {}
  }
  el.addEventListener(eventName, (e) => {
    handles[eventName] = {
      x: e.clientX,
      y: e.clientY
    }
    cb && cb(e)
  })
  return handles
}

