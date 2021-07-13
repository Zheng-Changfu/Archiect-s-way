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
