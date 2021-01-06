/**
 * 自定义全局包:
 *    1. 需要有一个bin目录
 *    2. 在bin目录中新建一个文件
 *    3. 在该文件的首行指定环境  #! /usr/bin/env node(代表node环境)
 *    4. 初始化一个package.json文件
 *    5. 指定bin字段 "bin": {
                        "zcf": "./bin/zcf"
                      },
      6. key为指令名字，value为输入该指令，运行的文件
      7. 通过npm link 链接(会将该文件临时存放到全局npm目录中)
 */