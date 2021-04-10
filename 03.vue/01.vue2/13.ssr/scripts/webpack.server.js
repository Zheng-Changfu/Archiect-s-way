const base =require('./webpack.base')
const {merge} = require('webpack-merge');
const  HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = merge(base,{
    target:'node',
    entry: {
        server:path.resolve(__dirname, '../src/server-entry.js')
    },
    output:{
        libraryTarget:"commonjs2"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            filename:'server.html',
            excludeChunks:['server'],
            minify:false
            // 默认的名字叫index.html
        }),
    ]
})