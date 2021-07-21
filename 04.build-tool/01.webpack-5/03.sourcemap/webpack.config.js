const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileManagerPlugin = require('filemanager-plugin').WebpackFilemanager
const webpack = require('webpack')
module.exports = {
  entry: {
    main: './03.sourcemap/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules/,
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new FileManagerPlugin({
      // 添加事件钩子
      events: {
        // 当编译结束时触发的钩子
        end: {
          // 复制
          copy: {
            items: [{
              source: './dist/*.map', // copy谁
              destination: path.resolve(__dirname, './03.sourcemap/maps') // copy到哪里去
            }]
          },
          // 删除
          del: {
            items: ['./dist/*.map']  // 删除谁
          }
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './03.sourcemap/src/index.html'
    })
  ],
  devServer: {
    open: true,
    hot: true,
    port: 8080
  },

}