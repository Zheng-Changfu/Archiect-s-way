# Webpack-5

## 1. 基础

### 1. 核心概念

- entry(入口) : 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图 的开始
- output(出口) : 告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件
- loader : webpack 只能理解 JavaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件
- plugin : loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量
- mode : 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production

### 2. 环境变量

1. --mode 用来设置模块内的 `process.env.NODE_ENV`
2. --env 用来设置 webpack 配置文件的函数参数，配置文件要写成函数形式
3. DefinePlugin 用来设置模块内的全局变量,是 webpack 的一个插件
4. cross-env 用来设置 node 环境的 `process.env.NODE_ENV`,也是比较常用的

### 3. 开发服务器

#### 3.1 理解以下 path 的作用及区别

| 类别      | 配置名称    | 描述                                          | 配置                                                      | 打包后                                                       |
| --------- | ----------- | --------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| output    | path        | 输出到硬盘上的目录路径                        | ![](\assets\output.png)                                   | ![](\assets\output-result.png)                               |
| output    | publicPath  | 打包生成的 html 文件里面引用的资源路径前缀    | ![](\assets\output-publicPath.png)                        | ![](\assets\output-publicPath-result.png)                    |
| devServer | publicPath  | 同 output.publicPath 一样，只不过优先级比它高 | 同 output.publicPath                                      | 同 output.publicPath                                         |
| devServer | contentBase | 用于配置额外静态文件内容目录的路径            | <img src="\assets\content-base.png" style="zoom:200%;" /> | <img src="\assets\content-base-result.png" style="zoom:200%;" /> |

### 4. use 的三种格式

1. 字符串格式: 一个 loader 的时候可以
2. 数组格式: 多个 loader 的时候可以, (从下往上|从右往左)依次执行
3. 对象格式: 给 loader 传参的时候可以用，一般写 options，options 里面的配置会传递给 loader

### 5. loader

| loader       | 意义                                                                                            | js-code                            | 配置                         | 打包后                                                           |
| ------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| raw-loader   | 解析原始文件                                                                                    | ![](\assets\raw-loader-code.png)   | ![](\assets\raw-loader.png)  | ![](\assets\raw-loader-result.png)                               |
| css-loader   | 解析@import 和 url                                                                              | ![](\assets\css-loader-result.png) | ![](\assets\css-loader.png)  |                                                                  |
| style-loader | 将 css 插入到 DOM 中                                                                            |                                    | ![](\assets\css-loader.png)  | <img src="\assets\style-loader-result.png" style="zoom:200%;" /> |
| file-loader  | 拷贝图片至打包目录下                                                                            |                                    | ![](\assets\file-loader.png) | ![](\assets\file-loader-result.png)                              |
| url-loader   | 当图片小于`limit`的时候会把图片`BASE64`编码，大于`limit`参数的时候还是使用`file-loader`进行拷贝 |                                    | ![](\assets\url-loader.png)  |                                                                  |

### 6. css兼容性处理





## 2. 深入