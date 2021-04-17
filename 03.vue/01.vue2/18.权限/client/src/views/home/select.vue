<template>
  <van-dropdown-menu>
    <van-dropdown-item
      @change="$emit('input', $event)"
      :value="selectValue"
      :options="selectList"
    />
  </van-dropdown-menu>
</template>

<script>
import * as Types from '@/store/constants'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters,
} = createNamespacedHelpers('home')
export default {
  name: 'Select',
  computed: {
    ...mapState(['selectList', 'selectValue']),
  },
  mounted() {
    // 请求数据
    this[Types.GET_SELECT]()
  },
  methods: {
    ...mapActions([Types.GET_SELECT]),
  },
}
</script>

<style scoped>
</style>
