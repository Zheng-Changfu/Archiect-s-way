<template>
  <input type="text" @input="input" />
</template>

<script>
export default {
  name: 'el-input',
  methods: {
    input(e) {
      // 数据双向绑定
      this.$emit('input', e.target.value)
      // 实时验证输入
      // 找到当前的父级元素，分发事件，告知修改,因为可能会深层次嵌套，所以我们需要一直向上查询
      this.$dispatch('el-form-item', 'changeValue')
    },
  },
}
</script>

<style scoped>
</style>
