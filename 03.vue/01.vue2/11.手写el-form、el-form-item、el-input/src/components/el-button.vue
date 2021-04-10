<template>
  <button @click="$emit('click')"><slot></slot></button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  name: 'el-button',
}
</script>

<style scoped>
</style>
