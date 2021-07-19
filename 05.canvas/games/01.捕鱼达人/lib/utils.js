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
<<<<<<< HEAD

export function registerListener (eventName, el, cb) {
  let handles = {}
  handles[eventName] = {}
  el.addEventListener(eventName, (e) => {
    handles[eventName].x = e.clientX
    handles[eventName].y = e.clientY
=======
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
>>>>>>> 652c38b29ccb3ec4e778d400cad96402c51c6059
    cb && cb(e)
  })
  return handles
}
<<<<<<< HEAD
=======

>>>>>>> 652c38b29ccb3ec4e778d400cad96402c51c6059
