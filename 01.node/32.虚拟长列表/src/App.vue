<template>
  <div id="app">
    <VirtualList :size="40" :remame="8" :data="arr" preload>
      <template v-slot:scroll="{ row }">
        <!-- row是当前遍历的每一项数据 -->
        <Item :row="row" />
      </template>
    </VirtualList>
  </div>
</template>

<script>
import VirtualList from './components/virtual-list'
import Item from './components/Item'
let total = 1000
let arr = []
for (let i = 0; i < total; i++) {
  arr.push(i)
}
export default {
  name: 'App',
  components: {
    VirtualList,
    Item,
  },
  data() {
    return {
      arr,
    }
  },
}
</script>

<style>
</style>
