/**
 * 链表是什么?
 * 链表是一种线性链式的存储结构
 * 简单理解:
 *    用一根链子把一个个的元素串起来
 *    比如我们有一个数组，数组中有一万个元素,[1,2,3,...,10000],那么此时我们如果把1给删了，那么后面的9999个元素
 *    都需要向前移动一位，性能开销比较大,此时我们如果换成链表的方式
 *    head:链子头
 *    el:链子上的元素
 *    next:链子上的当前元素的下一个元素
 *
 *    head
 *    el:1    el:2    el:3    el:...  el:10000
 *    next ==>next ==>next ==>next ==>next ==> null
 *    此时我们如果要把2给删了，我们只需要让1的next指向3是不是就ok了，更改指针的方式来软删除元素
 */

// 元素类
class Node {
  constructor(el, next) {
    this.el = el
    this.next = next
  }
}

// 链表(数据结构中一定要有增删改查)
class LinkedList {
  constructor() {
    // { el: 10, next: null }
    // { el: 20: next: { el: 10, next: null } } 
    // { el: 30, next: { 20: next: { el: 10, next: null } } }
    this.head = null // 链子头，一开始没有元素，所以我们的链子头是null
    this.size = 0 // 链子的长度
  }
  /**
   * 
   * @param {*} index 根据索引去查询元素
   */
  _getNode (index) {
    let node = this.head
    for (let i = 0; i < index; i++) {
      node = node.next
    }
    return node
  }
  /**
   * 
   * @param {*} index 元素索引
   * @param {*} el 元素
   * 如果参数只有1个，那么就默认为向后增加元素
   */
  add (index, el) {
    if (arguments.length === 1) {
      el = index
      index = this.size
    }
    if (index === 0) {
      this.head = new Node(el, this.head)
    } else {
      // 应该根据传进来的索引找到当前元素的上一项，让上一项的指针指向当前元素，当前元素的指针指向之前上一项的指针指向的元素
      // 查到当前元素对应索引的上一项，根据索引去查元素
      const preNode = this._getNode(index - 1)
      // console.log(preNode)
      preNode.next = new Node(el, preNode.next)
    }
    this.size++
  }
  /**
   * 
   * @param {*} index 删除指定位置索引
   */
  remove (index) {
    let removeNode
    if (index === 0) {
      // 移除头部节点
      // 直接让指针指向原来链子头的下一个元素
      const head = removeNode = this.head
      this.head = head.next
    } else {
      // 查找到索引对应的元素的上一个元素,让上一个元素的指针指向当前元素的下一个
      const preNode = this._getNode(index - 1)
      removeNode = preNode.next
      preNode.next = preNode.next.next
    }
    this.size--
    return removeNode.el
  }

  /**
   * 
   * @param {*} index 元素索引
   * @param {*} el 想修改的值
   */
  set (index, el) {
    const node = this._getNode(index)
    node.el = el
    return node
  }

  /**
   * 
   * @param {*} index 元素索引
   */
  get (index) {
    return this._getNode(index).el
  }

  // 清空链表
  clear () {
    this.size = 0
    this.head = null
  }
}

const ll = new LinkedList()
// ll.add(10)
// ll.add(20)
// ll.add(30)
// ll.add(40)
ll.add(0, 10)
ll.add(1, 20)
ll.add(2, 30)
ll.add(3, 40)
// ll.add(3, 100)
// console.log(ll.set(0, 'set40'))
// console.log(ll.remove(3))
// console.log(ll.get(3))
// ll.set(3, 'set10')
// ll.clear()
console.dir(ll, { depth: 1000 })
// new FormData