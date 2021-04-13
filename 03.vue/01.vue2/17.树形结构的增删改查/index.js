/**
 * 很多时候，后台都会返回给我们一个树形结构的数据，前端递归渲染
 * 那如果这个渲染出来的树要进行增删改查，我们怎么操作呢?
 *
 * 常规思路:
 *  增的时候递归找到当前的父级元素，在父级元素中增加一条数据
 *  查的时候递归查找当前元素，返回当前元素信息
 *  删的时候递归查找到当前元素id
 *  改的时候递归找到当前元素
 *
 * 以上可得:
 *  性能开销非常大，当我们树形结构嵌套越深，数据越多，开销就越大，可能会导致卡死/崩溃/缓慢的效果
 *
 * 优化思路:
 *  当我们前端递归渲染菜单的时候，对递归的数据进行扁平化处理，形成映射表，那么这样的话就方便很多了
 */


class DelayerTree {
  /**
   * 
   * @param {*} options 后台返回的数据
   */
  constructor(options) {
    this.options = options
    this._treeMap = {}
    this.dirty = false // 为true就表示脏了，就重新装载树，false就返回老树
    this.delayerTree(options)
  }

  /**
   * 
   * @param {string} parentId 要添加到哪个父级菜单中
   * @param  {...any} rest 额外参数
   */
  add (parentId, { ...rest }) {
    this.dirty = true
    const uid = new Date() + Math.floor(Math.random() * 10000)
    // 找到对应的父级
    let parent = this._treeMap[parentId]
    const record = {
      id: uid,
      parentId,
      parent,
      isAdd: true, // 标识是新增的节点
      ...rest
    }
    parent.children = parent.children ? parent.children : []
    parent.children.push(record)
    this._treeMap[uid] = record
    // 修改父级引用
    let topParent = this._treeMap[parent.parentId]
    if (typeof topParent.parent === 'undefined') {
      topParent.children[parent.inx] = parent
      topParent = this._treeMap[topParent.parentId]
      parent = topParent
    } else {
      while (topParent && typeof topParent.parent !== 'undefined') {
        // debugger
        topParent.children[parent.inx] = parent
        topParent = this._treeMap[topParent.parentId]
        parent = topParent
      }
    }
    return this._treeMap
  }

  /**
   * 
   * @param {*} id 要删除子项的id
   */
  remove (id) {
    this.dirty = true
    delete this._treeMap[id]
    return this._treeMap
  }

  /**
   * 
   * @param {*} id 要更新子项的id
   * @param  {...any} rest 其他参数
   */
  update (id, ...rest) {
    this.dirty = true
    const record = this._treeMap[id]
    this._treeMap[id] = {
      ...record,
      ...rest
    }
    return this._treeMap
  }

  /**
   * 
   * @param {*} id 获取对应子项id的匹配记录
   */
  get (id) {
    return this._treeMap[id]
  }
  /**
   * 
   * @param {*} tree[] 树形菜单数据 => 扁平化处理
   */
  delayerTree (tree) {
    for (let i = 0; i < tree.length; i++) {
      const ctree = tree[i]
      this.createTreeMap(ctree, undefined, i)
    }
  }
  /**
   * 
   * @param {*} ctree 树的子节点
   */
  createTreeMap (ctree, parent, inx) {
    const { id, parentId, ...other } = ctree
    let record = {
      id: id,
      parentId,
      parent,
      inx,
      ...other
    }
    this._treeMap[id] = record
    if (ctree.children && ctree.children.length > 0) {
      for (let i = 0; i < ctree.children.length; i++) {
        let child = ctree.children[i]
        this.createTreeMap(child, record, i)
      }
    }
  }
  /**
   * 
   * @param {*} _treeMap 扁平化数据 ==> 树形菜单数据
   */
  resetLoad (_treeMap) {
    // 看有没有被操作过，如果没有被操作过，说明可以返回初始化的老树
    if (!this.dirty) return this.options
    // 将映射表重新装载成树形结构
    let res = []
    Object.keys(_treeMap).forEach(key => {
      const record = _treeMap[key]
      if (typeof record.parent === 'undefined') {
        // 说明是顶层菜单
        res.push(record)
      }
    })
    return res
  }
}
export default DelayerTree