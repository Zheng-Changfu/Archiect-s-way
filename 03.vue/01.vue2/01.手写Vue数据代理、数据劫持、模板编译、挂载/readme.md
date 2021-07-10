     #  1. new Vue
     #  2. 数据代理
     #  3. 数据劫持
     #  4. 模板解析
        ## 4.1 : 获取el元素，获取el的outerHTML，字符串的代码
        ## 4.2 : compileTofunction函数，将字符串做为参数传入
        ## 4.3 : 将这个字符串代码编译成ast语法树，不停的用正则去匹配标签上的东西，匹配到了就删掉
        ## 4.4 : 将这个ast语法树编译成字符串的render函数
        ## 4.5 : 通过new Function + with生成真实的render函数
        ## 4.6 : 返回render函数
     # 5. 挂载组件
        ## 5.1 : 调用render函数，生成虚拟dom对象
        ## 5.2 : 调用patch函数，进行新旧虚拟dom比较
        ## 5.3 : 生成真实dom
