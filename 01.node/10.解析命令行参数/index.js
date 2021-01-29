const program = require('commander')
const chalk = require('chalk') // 改变终端文字颜色的包
/**
 * process.argv
 * [
      'D:\\software\\node.exe',
      'C:\\Users\\Administrator\\Desktop\\Archiect-s-way\\01.node\\10.解析命令行参数\\index.js',
      '--zcf',
      '1',
      '--port',
      '3001'
    ]
 */
// console.log(process.argv, 'process.argv')
program.on('--help', function () {
  console.log(chalk.red('11111'))
})
program
  .option('-z, --zcf [type]', '名字')
program.parse(process.argv) // 解析用户执行时的参数

// console.log(program, 'program')