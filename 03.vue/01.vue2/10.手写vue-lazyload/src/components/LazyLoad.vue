<template>
  <div class="imgContainer">
    <img v-lazy="item" v-for="(item, index) in list" :key="index" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyLoad from '../plugins/lazyload'
import loading from '../../public/assets/loading.jpeg'
import axios from 'axios'
Vue.use(VueLazyLoad, {
  loading,
  preload: 0.5,
})
export default {
  name: 'LazyLoad',
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    const res = await axios({
      method: 'get',
      url: 'http://localhost:3000/getlist',
    })
    this.list = res.data
  },
}
</script>

<style scoped>
.imgContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 200px;
  height: 400px;
  border: 1px solid #ccc;
  overflow: scroll;
}
img {
  width: 90px;
  height: 90px;
  margin-bottom: 10px;
}
</style>
