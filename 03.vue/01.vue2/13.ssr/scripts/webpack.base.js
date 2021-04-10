// webpack打包的入口文件 ， 需要导出配置

// webpack webpack-cli
// @babel/core babel的核心模块 
// babel-loader  webpack和babel的一个桥梁
// @babel/preset-env  把es6+ 转换成低级语法

// vue-loader vue-template-compiler  解析.vue文件 并且编译模板
// vue-style-loader css-loader 解析css样式并且插入到style标签中， vue-style-loader支持服务端渲染
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    mode: 'development',
    output: {
        filename: '[name].bundle.js' ,// 默认就是main, 默认是dist目录
        path:path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader', // @babel/core -> preset-env
                options: {
                    presets: ['@babel/preset-env'], // 插件的集合 
                }
            },
            exclude: /node_modules/ // 表示node_modules的下的文件不需要查找
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', {
                loader: 'css-loader',
                options: {
                    esModule: false, // 注意为了配套使用vue-style-loader
                }
            }] // 从右向左执行
        }]
    },
    plugins: [
        new VueLoaderPlugin() // 固定的
    ]
}