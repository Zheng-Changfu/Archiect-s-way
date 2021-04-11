export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => {
    fn(obj[key], key)
  })
}
export function isArray (data) {
  return Array.isArray(data)
}