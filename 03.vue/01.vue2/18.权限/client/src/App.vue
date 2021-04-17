<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar v-model="active" v-if="!$route.meta.hidden_navbar">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/detail">详情</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/user">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      active: 0,
    }
  },
}
</script>
<style lang="scss">
#app {
  .van-nav-bar__content {
    background-color: $bgcolor;
    .van-nav-bar__title {
      color: $color;
    }
  }
}
</style>
