<template>
  <div>
    <Select v-model="value" />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <img :src="item.url" :alt="item.desc" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import * as Types from '@/store/constants'
import { createNamespacedHelpers } from 'vuex'
import Select from './select'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('home')
export default {
  name: 'Home',
  computed: {
    ...mapState(['selectValue', 'swiperList']),
    value: {
      get() {
        return this.selectValue
      },
      set(newVal) {
        this[Types.SET_SELECTVALUE](newVal)
      },
    },
  },
  mounted() {
    this[Types.GET_SWIPER]()
  },
  methods: {
    ...mapMutations([Types.SET_SELECTVALUE]),
    ...mapActions([Types.GET_SWIPER]),
  },
  components: {
    Select,
  },
}
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 100%;
  height: 200px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
