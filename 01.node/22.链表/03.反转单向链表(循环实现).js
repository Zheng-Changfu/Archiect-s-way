class Node {
  constructor(el, next) {
    this.el = el
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }

  _getNode (index) {
    let node = this.head
    for (let i = 0; i < index; i++) {
      node = node.next
    }
    return node
  }

  add (index, el) {
    if (arguments.length === 1) {
      el = index
      index = this.size
    }
    if (index === 0) {
      this.head = new Node(el, this.head)
    } else {
      const preNode = this._getNode(index - 1)
      preNode.next = new Node(el, preNode.next)
    }
    this.size++
  }

  remove (index) {
    let removeNode
    if (index === 0) {
      const head = removeNode = this.head
      this.head = head.next
    } else {
      const preNode = this._getNode(index - 1)
      removeNode = preNode.next
      preNode.next = preNode.next.next
    }
    this.size--
    return removeNode.el
  }

  set (index, el) {
    const node = this._getNode(index)
    node.el = el
    return node
  }

  get (index) {
    return this._getNode(index).el
  }

  clear () {
    this.size = 0
    this.head = null
  }

  // 反转链表
  reverseLinkedList () {
    // 循环实现
    // 10 => 20 => 30 => null
    // 10 => null
    // 20 => 10 => null
    // 30 => 20 => 10 => null
    let head = this.head
    let newHead = null
    while (head !== null) {
      // 拿到每一个头的指针
      let temp = head.next
      newHead = new Node(head.el, newHead)
      head = temp
    }
    this.head = newHead
    return newHead
  }
}

const ll = new LinkedList()
ll.add(10)
ll.add(20)
ll.add(30)
ll.add(40)
// ll.add(3, 100)
console.dir(ll, { depth: 1000 })
ll.reverseLinkedList()
console.dir(ll, { depth: 1000 })