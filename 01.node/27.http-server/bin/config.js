module.exports = {
  // 端口号
  port: {
    option: '-p,--port <n>',
    default: 3000,
    desc: 'set server port',
    usage: 'hhz -p/--port <n>'
  },
  // 运行目录
  directory: {
    option: '-d,--directory <n>',
    default: process.cwd(),
    desc: 'set server directory',
    usage: 'hhz -d/--directory <n>',
  },
  // 缓存
  cache: {
    option: '-c,--cache <n>',
    default: 'no-cache',
    desc: 'set server cache',
    usage: 'hhz -c/--cache <n>'
  }
}