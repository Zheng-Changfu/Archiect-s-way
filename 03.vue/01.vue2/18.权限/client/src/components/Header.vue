<template>
  <van-nav-bar :title="title || '标题'" />
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
  },
}
</script>

<style lang='scss' scoped>

</style>
