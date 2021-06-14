export const isObject = val => typeof val === 'object' && val !== null
export const extend = Object.assign
export const stringify = JSON.stringify
export const isArray = Array.isArray
export const IntegerKey = key => parseInt(key) + '' === key
export const isFunc = val => typeof val === 'function'
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
export const hasChanged = (oldValue, value) => oldValue !== value
export const warn = (val) => console.warn(val)