const {merge} = require('webpack-merge');
const base =require('./webpack.base');
const path = require('path')
const  HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(base,{
    entry: {
        client:path.resolve(__dirname, '../src/client-entry.js')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename:'client.html'
            // 默认的名字叫index.html
        }),
    ]
})