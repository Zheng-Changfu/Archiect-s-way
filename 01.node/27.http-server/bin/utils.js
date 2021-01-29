// 合并对象
// o1 => 02
const mergeObj = (o1, o2) => {
  const obj = {}
  for (let key in o1) {
    if (key === 'port' && key in o2) {
      o2[key] = o2[key] >>> 0
    }
    obj[key] = key in o2 ? o2[key] : o1[key]
  }
  return obj
}
module.exports = {
  mergeObj
}