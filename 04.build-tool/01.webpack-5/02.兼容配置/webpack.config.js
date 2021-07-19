const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    main: path.resolve(__dirname, './02.兼容配置/src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules/, // 排除node_modules
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './02.兼容配置/src/index.html'
    })
  ],
  mode: 'development'
}