const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
console.log(1111111111)
module.exports = {
  entry: {
    main: './04.打包第三方类库/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // {
      //   /**
      //    * require和require.resolve区别
      //    * require: 引入对应包并执行包
      //    * require.resolve: 引入对应包不执行(返回值是该包的路径) 
      //    */
      //   test: require.resolve('jquery'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: {
      //       globalName: '$', // 会在全局上挂载一个变量为 $
      //       override: true // 如果全局上已经存在其他的$,会进行覆盖
      //     }
      //   }
      // }
    ]
  },

  externals: {
    'jquery': '$'
  },


  plugins: [
    new HtmlWebpackPlugin({
      template: './04.打包第三方类库/src/index.html'
    }),
    new webpack.BannerPlugin('郑常富'),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '04.打包第三方类库/src/index.html'),//静态资源目录源地址
        to: path.resolve(__dirname, 'dist/html'), //目标地址，相对于output的path目录
      }],
    }),
    // new webpack.ProvidePlugin({
    //   '$': 'jquery'
    // })
  ],
  mode: 'development'
}