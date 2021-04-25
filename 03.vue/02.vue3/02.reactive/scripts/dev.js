// 只针对具体的某个包打包



const fs = require('fs');
const execa = require('execa'); // 开启子进程 进行打包， 最终还是使用rollup来进行打包

const target = 'reactivity'


// 对我们目标进行依次打包 ，并行打包

build(target)
async function build(target){ // rollup  -c --environment TARGET:shated
    await execa('rollup',['-cw','--environment',`TARGET:${target}`],{stdio:'inherit'}); // 当子进程打包的信息共享给父进程
}
