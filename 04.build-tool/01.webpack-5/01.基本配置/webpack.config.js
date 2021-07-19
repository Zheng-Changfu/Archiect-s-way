const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    // 开始打包入口
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后的目录
    filename: 'dist.js', // 打包后的文件名
    // publicPath: '/assets'
  },
  // 开发服务
  devServer: {
    // publicPath: '',
    contentBase: path.resolve(__dirname, 'assets'), // 额外的静态资源目录
    port: 8080,
    open: true,
    hot: true,
  },
  module: {
    // loader
    rules: [
      // use-loader作用顺序:
      /**
       * use的三种格式:
       *  1. 字符串格式: 一个loader的时候可以
       *  2. 数组格式: 多个loader的时候可以, (从下往上|从右往左)依次执行
       *  3. 对象格式: 给loader传参的时候可以用，一般写options，options里面的配置会传递给loader
       */
      { test: /\.txt$/, use: { loader: 'raw-loader', options: { esModule: false } } }, // 解析原始文件
      { test: /\.css$/, use: [/* 将css插入到DOM中 */'style-loader', /* 用来处理 @import和url() */ 'css-loader'] },
      { test: /\.s(css|ass)/, use: ['style-loader', 'css-loader',/* 将scss|sass文件编译成css文件 */ 'sass-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', /* 将less文件编译成css文件 */'less-loader'] },
      // {
      //   test: /\.(jpg|png|jpeg|gif|svg|bmp)$/, use: {
      //     loader: 'file-loader',
      //     options: {
      //       esModule: false, // 默认会被编译成一个Module对象，需要.default才能拿到，设置为false则默认输出，不需要.default
      //       name: '[hash:10].[ext]' // 图片名字取hash值前10位，后缀不变
      //     }
      //   }
      // },
      {
        test: /\.(jpg|png|jpeg|gif|svg|bmp)$/, use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[hash:10].[ext]',
            limit: 20 * 1024 // 小于20k的图片会被转成base64格式打包进 js代码中
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}