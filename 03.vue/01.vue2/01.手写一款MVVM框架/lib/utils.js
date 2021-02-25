// 工具函数汇总

// 检测数据类型
export const typeofFn = (fnName) => {
  // 生成函数
  return (data) => {
    return Object.prototype.toString.call(data).slice(8, -1) === fnName.slice(2)
  }
}


