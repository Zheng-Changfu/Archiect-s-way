<template>
  <div>
    <button>增加</button>
    <button>删除</button>
    <button>编辑</button>
    <div class="container">
      <transfer-tree :data="checkRightTree" />
      <transfer-icon />
      <transfer-tree :data="checkLeftTree" />
    </div>
  </div>
</template>

<script>
import TransferTree from './tree.js'
import TransferIcon from './icon'
export default {
  name: 'TransFer',
  data() {
    return {
      treeList: [
        {
          title: '菜单1',
          id: '11111',
          parentId: '0',
          children: [
            {
              title: '菜单1-1',
              parentId: '11111',
              id: '222222',
            },
          ],
        },
        {
          title: '菜单2',
          id: '333',
          parentId: '0',
          children: [
            {
              title: '菜单2-1',
              id: '444',
              parentId: '333',
              children: [
                {
                  title: '菜单2-1-1',
                  id: '6666',
                  parentId: '444',
                },
              ],
            },
            {
              title: '菜单2-2',
              id: '555',
              parentId: '333',
            },
          ],
        },
      ],
      treeMap: {},
    }
  },
  mounted() {
    this.createTreeMap(this.treeList)
    console.log(this.treeMap, '~~~')
  },
  methods: {
    createTreeMap(treeList) {
      treeList.forEach((tree) => {
        this.createTreeRecord(tree)
      })
    },
    createTreeRecord(tree, parent) {
      let record = {
        id: tree.id,
        parentId: tree.parentId,
        parent,
      }
      this.treeMap[tree.id] = record
      if (tree.children && tree.children.length > 0) {
        tree.children.forEach((cTree) => this.createTreeRecord(cTree, record))
      }
    },
  },
  computed: {
    checkRightTree() {
      return this.treeList
    },
    checkLeftTree() {
      return []
    },
  },
  components: {
    TransferTree,
    TransferIcon,
  },
}
</script>

<style scoped>
.container {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
