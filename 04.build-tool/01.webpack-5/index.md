# Webpack-5（基础）

## 1. 核心概念

- entry(入口) : 指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图 的开始
- output(出口) : 告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件
- loader : webpack 只能理解 JavaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件
- plugin : loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量
- mode : 通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 production

## 2. 环境变量

1. --mode 用来设置模块内的 `process.env.NODE_ENV`
2. --env 用来设置 webpack 配置文件的函数参数，配置文件要写成函数形式
3. DefinePlugin 用来设置模块内的全局变量,是 webpack 的一个插件
4. cross-env 用来设置 node 环境的 `process.env.NODE_ENV`,也是比较常用的

## 3. 开发服务器

### 3.1 理解以下 path 的作用及区别

| 类别      | 配置名称    | 描述                                          | 配置                                                      | 打包后                                                       |
| --------- | ----------- | --------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| output    | path        | 输出到硬盘上的目录路径                        | ![](\assets\output.png)                                   | ![](\assets\output-result.png)                               |
| output    | publicPath  | 打包生成的 html 文件里面引用的资源路径前缀    | ![](\assets\output-publicPath.png)                        | ![](\assets\output-publicPath-result.png)                    |
| devServer | publicPath  | 同 output.publicPath 一样，只不过优先级比它高 | 同 output.publicPath                                      | 同 output.publicPath                                         |
| devServer | contentBase | 用于配置额外静态文件内容目录的路径            | <img src="\assets\content-base.png" style="zoom:200%;" /> | <img src="\assets\content-base-result.png" style="zoom:200%;" /> |

## 4. use 的三种格式

1. 字符串格式: 一个 loader 的时候可以
2. 数组格式: 多个 loader 的时候可以, (从下往上|从右往左)依次执行
3. 对象格式: 给 loader 传参的时候可以用，一般写 options，options 里面的配置会传递给 loader

## 5. loader

| loader       | 意义                                                         | js-code                                                      | 配置                                                     | 打包后                                                       |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| raw-loader   | 解析原始文件                                                 | <img src="\assets\raw-loader-code.png" style="zoom:200%;" /> | <img src="\assets\raw-loader.png" style="zoom:200%;" />  | ![](\assets\raw-loader-result.png)                           |
| css-loader   | 解析@import 和 url                                           | <img src="\assets\css-loader-result.png" style="zoom:200%;" /> | <img src="\assets\css-loader.png" style="zoom:200%;" />  |                                                              |
| style-loader | 将 css 插入到 DOM 中                                         |                                                              | <img src="\assets\css-loader.png" style="zoom:200%;" />  | <img src="\assets\style-loader-result.png" style="zoom:200%;" /> |
| file-loader  | 拷贝图片至打包目录下                                         |                                                              | <img src="\assets\file-loader.png" style="zoom:200%;" /> | ![](\assets\file-loader-result.png)                          |
| url-loader   | 当图片小于`limit`的时候会把图片`BASE64`编码，大于`limit`参数的时候还是使用`file-loader`进行拷贝 |                                                              | <img src="\assets\url-loader.png" style="zoom:200%;" />  |                                                              |

## 6. css兼容性处理

### 6.1 安装

```bash
npm install postcss-loader autoprefixer -D
```

### 6.2 配置

![](\assets\postcss-loader.png) 



![](\assets\postcss.config.js.png) 

### 6.3 结果

![](\assets\postcss-loader-result.png) 

## 7. js兼容性处理

### 7.1 安装

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

### 7.2 包说明

> babel-loader : 不知道如何处理和转换 js 代码，内部会调用 @babel/core
>
> @babel/core : 认识 js 代码，但是不知道怎么转换，内部会调用 @babel/preset-env
>
> @babel/preset-env : 插件的集合被打成了一个包，这个包就叫预设，可以将高级语法转换成低级语法

## 8. sourcemap(源映射)

### 8.1 基本认识

| 关键字     | 含义                                        |
| ---------- | ------------------------------------------- |
| source-map | 产生.map的映射文件                          |
| eval       | 使用eval函数包裹模块代码                    |
| cheap      | 不包含列信息，也不包含loader的sourcemap     |
| module     | 包含loader的sourcemap，否则无法映射到源文件 |
| inline     | 将.map作为DataURL嵌入，不单独生成.map文件   |

- 以上模式可以进行任意组合

### 8.2 开启source-map模式

#### 8.2.1 源代码

![](\assets\source-map.png) 

#### 8.2.2 编译后目录

![](\assets\source-map-dist.png) 

#### 8.2.3 bundle.js

![](\assets\source-map-bundle-code.png) 

#### 8.2.4 bundle.js.map

![](\assets\source-map-bundle-map-code.png) 

#### 8.2.5 增加错误代码

![](\assets\source-map-error-code.png) 

#### 8.2.6 浏览器控制台定位到的错误信息

![](\assets\source-map-error-code-result1.png) 

![](\assets\source-map-error-code-result2.png) 

### 8.3 开启eval模式

- eval 模式 和 source-map差不多，eval可以用来做缓存，后续构建速度更快，生成的.map映射文件内容都是一样的

#### 8.3.1 bundle.js

![](\assets\eval.png) 

### 8.4 开启cheap-source-map模式

#### 8.4.1 bundle.js

![](\assets\source-map-bundle-code.png) 

#### 8.4.2 bundle.js.map

![](\assets\cheap-bundle-map-code.png) 

#### 8.4.3 浏览器控制台定位到的错误信息

![](\assets\cheap-error-code-result.png) 

### 8.5 开启inline-source-map模式

#### 8.5.1 bundle.js(无.map文件)

![](\assets\inline.png) 

### 8.6 source-map图解

![](\assets\source-map-process.png) 

### 8.7 cheap-source-map图解

![](\assets\cheap-source-map-process.png) 

### 8.8 cheap-module-source-map图解

![](\assets\cheap-module-source-map-process.png) 

### 8.9 sourcemap最佳实践

#### 8.9.1 组合规则

| 组合(规则)                                                   | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| \[inline-\|hidden-\|eval-][nosources-]\[cheap-[module-]]source-map | 组合规则强制要求顺序                                         |
| source-map                                                   | 会在外部生成单独的sourcemap文件，会与源代码文件进行关联，能提示代码的准确原始位置 |
| inline-source-map                                            | 以base64格式内联在打包后的文件中，内联构建速度快、也能提示错误代码的准确原始位置 |
| hidden-source-map                                            | 会在外部生成单独的sourcemap文件，但是不和源代码文件进行关联，不能提示错误代码的准确原始位置 |
| eval-source-map                                              | 会给每一个模块生成单独的sourcemap文件进行内联，并使用eval执行 |
| nosources-source-map                                         | 会在外部生成sourcemap文件，能找到源代码位置，但是源代码内容为空 |
| cheap-source-map                                             | 会在外部生成sourcemap文件，不包含列和loader的map信息         |
| cheap-module-source-map                                      | 会在外部生成sourcemap文件，不包含列的信息                    |

#### 8.9.2 开发环境

1. 速度快：`eval-cheap-source-map`
2. 调试友好：`eval-cheap-module-source-map`
3. 推荐：`eval-source-map`

#### 8.9.3 生产环境

1. 速度快：`cheap`
2. 调试友好：`[source-map]>[cheap-source-map | cheap-module-source-map]>[hideen-source-map | nosources-source-map]`
3. 推荐：`hidden-source-map`,会生成`sourcemap`文件，但是不进行关联、不会上传关联信息

#### 8.9.4 开发环境调试

1. 本地代码编辑器内调试

2. 通过source控制器调试

   - 右键打开控制台
   
- 选择sources
  
     ![](\assets\debugger-source-map-dev.png) 
   
   - 右键`top`，选择`Search in all files`
   
     ![](\assets\debugger-source-map-dev-search-files.png) 
   
   - 搜索你想搜的代码
   
     ![](\assets\debugger-source-map-search-code.png) 
   
     
   
      ![](\assets\debugger-source-map-search-result.png)
   

#### 8.9.5 测试环境调试

>  通过`source-map-dev-tool-plugin`进行细粒度的控制

- 步骤一：设置`devtool:false`关闭 

  ![](\assets\set-devtool-false.png) 

- 步骤二：通过`webpack.source-map-dev-tool-plugin`来生成sourcemap文件，并进行相关设置

  ![](\assets\source-map-dev-tool-plugin.png) 

- 步骤三：通过`filemanager-plugin插件`来拷贝源映射文件到其他目录，并删除原来的源映射文件，因为测试时我们的代码需要打包，打包生成的目录发给测试，其他的不需要发给测试，打包目录中没有源映射文件等敏感信息的

  ![](\assets\file-manager-plugin.png) 

- 步骤四：本地启动一个服务，如: `http-server`，保证通过端口号能访问到拷贝后的源映射文件即可，这样就可以进行调试了

  ![](\assets\http-server.png) 

- 步骤五：查看源代码

  ![](\assets\source-mapping-url.png) 

- 步骤六：增加断点调试，大功告成

  ![](\assets\debugger-source-map.png) 

> 总结：
>
> ​	优点：安全，只能你一个人调试，别人是调试不了的，除非你共享了拷贝后的源映射文件
>
> ​	缺点：有点点小麻烦

#### 8.9.6 生产环境调试

`说明: 生产环境是没有map文件的，为了隐私安全`

- 步骤一：修改环境为生产环境,真实项目可通过环境变量来区分

  ![](\assets\set-mode-production.png) 

- 步骤二：修改`devtool:hidden-source-map`，会生成sourcemap文件，我们`步骤三`会进行删除

  ![](\assets\set-devtool-hidden-source-map.png) 

- 步骤三：拷贝sourcemap文件至另外目录，删除打包目录中的sourcemap文件

  ![](\assets\copy-source-map-delete-dist-source-map.png) 

- 步骤四：开启本地服务，如：http-server，只要保证能访问到sourcemap文件即可

  ![](\assets\http-server.png) 

- 步骤五：sources开启调试

  - 打开sources

  ![](\assets\debugger-source-map-dev.png)

  - 设置-勾选`Enabled Javascript source maps`选项

    ![](\assets\debugger-source-map-prod-settings.png) 

    ![](\assets\debugger-source-map-settings-enabled.png) 

  - 手动添加`source-map`文件地址进行关联

    ![](\assets\choose-source-map-address.png) 

    ![](\assets\add-source-map-address.png)

    ![](\assets\add-source-map-address-result.png) 

    ![](\assets\add-source-map-address-result-code.png) 

> 总结：
>
> ​	优点：安全性高、可以把sourcemap文件放在本地或者安全的服务器上，保证不会泄露就行，调试方便
>
> ​	缺点：调试前的准备工作稍多

## 9. 打包第三方类库

> 我们在项目中可能经常会用到一些第三方库，而有些库我们基本上写一些组件都需要用到，比如`lodash`,而我们不想每一个组件都需要单独引入,这时候我们就需要进行相应的配置了

### 9.1 ProvidePlugin

> 会自动的将函数添加到每个模块的上下文中，不需要显示声明

![](\assets\provide-plugin.png) 

![](\assets\provide-plugin-code.png) 

![](\assets\provide-plugin-result.png) 

> 优点：方便，不需要每次引入
>
> 缺点：并不会挂载到`全局上`,所以导入`依赖全局变量的插件`会失败

### 9.2 expose-loader

> 挂载全局变量

```bash
npm install expose-loader -D
```

![](\assets\expose-loader.png) 

![](\assets\expose-loader-code.png) 

![](\assets\expose-loader-result.png) 

### 9.3 externals

> 我们不想进行打包，但是又想在每个模块中使用，并且还想在全局上用，就可以用到`externals`

![](\assets\externals.png) 

![](\assets\externals-code.png) 

![](assets\externals-code-html.png)  

![](assets\externals-result.png)  

## 10. some-plugin-desc

| plugin               | 描述             | 配置                                                         | 输出                                        |
| -------------------- | ---------------- | ------------------------------------------------------------ | ------------------------------------------- |
| webpack.BannerPlugin | 添加商标         | new webpack.BannerPlugin('郑常富')                           | ![](\assets\banner-plugin.png)              |
| copy-webpack-plugin  | 拷贝文件         | ![](\assets\copy-webpack-plugin.png)                         | ![](\assets\copy-webpack-plugin-result.png) |
| clean-webpack-plugin | 打包前先清除目录 | const {CleanWebpackPlugin} = require('clean-webpack-plugin')<br />new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*'],}) |                                             |

## 11. 提取css

> 我们一般在生产环境时，加载css都用link标签，因为不会阻塞html的执行，这时候我们需要将我们写的css`单独提取成一个文件`

```bash
npm install mini-css-extract-plugin -D
```

![](\assets\mini-css-extract-plugin.png) 

![](\assets\mini-css-extract-plugin-code.png) 

![](\assets\mini-css-extract-plugin-result1.png) 

![](\assets\mini-css-extract-plugin-result2.png) 

## 12. 三种hash值的区别

## 13. px2rem-loader