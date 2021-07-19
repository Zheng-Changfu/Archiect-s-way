const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
  devtool: 'cheap-source-map',
  devServer: {
    open: true,
    hot: true,
    port: 8080
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './03.sourcemap/src/index.html'
    })
  ]
}