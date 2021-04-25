// rollup的配置

import path from 'path';
import json from '@rollup/plugin-json';
import resolvePlugin from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

// 根据环境变量中的target属性 获取对应模块中的 pakcage.json

const packagesDir = path.resolve(__dirname,'packages'); // 找到packages 

// packageDir 打包的基准目录
const packageDir = path.resolve(packagesDir,process.env.TARGET)  // 找到要打包的某个包

// 永远针对的是某个模块
const resolve = (p)=>path.resolve(packageDir,p)



const pkg = require(resolve('package.json'));
const name = path.basename(packageDir); // 取文件名

// 对打包类型 先做一个映射表，根据你提供的formats 来格式化需要打包的内容
const outputConfig = { // 自定义的
    'esm-bundler':{
        file: resolve(`dist/${name}.esm-bundler.js`),
        format:'es'
    },
    'cjs':{
        file:resolve(`dist/${name}.cjs.js`),
        format:'cjs'
    },
    'global':{
        file:resolve(`dist/${name}.global.js`),
        format:'iife' // 立即执行函数
    }
}
const options = pkg.buildOptions; // 自己在package.json中定义的选项

function createConfig(format,output) {
    output.name = options.name;
    output.sourcemap = true; // 生成sourcemap

    // 生成rollup配置

    return {
        input: resolve(`src/index.ts`),
        output,
        plugins:[
            json(),
            ts({ // ts 插件 
                tsconfig:path.resolve(__dirname,'tsconfig.json')
            }),
            resolvePlugin() // 解析第三方模块插件
        ]
    }

}
// rollup 最终需要到出配置
export default options.formats.map(format=>createConfig(format,outputConfig[format]))