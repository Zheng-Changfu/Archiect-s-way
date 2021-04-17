// 动态注入vuex-module

// context第一个参数: path,获取当前目录
// context第二个参数: 是否需要子文件,是
// context第三个参数: 需要哪些文件，需要以js结尾的文件
const files = require.context('.', true, /\.js$/)

// console.log(files.keys())
/**
 * ["./home/action.js",
 * "./home/mutation.js",
 * "./home/state.js",
 *  "./index.js",
 *  "./user/action.js",
 *  "./user/mutation.js",
 *  "./user/state.js"
 * ]
 */
let modules = {}
files.keys().forEach(key => {
  // 将./和.js替换掉
  let path = key.replace(/\.\/|\.js/g, '')
  if (path === 'index') return // 自己忽略
  const [namespace, type] = path.split('/')
  if (!modules[namespace]) {
    // 增加命名空间
    modules[namespace] = {
      namespaced: true
    }
  }
  modules[namespace][type] = files(key).default // 文件暴露的结果
})
export default modules