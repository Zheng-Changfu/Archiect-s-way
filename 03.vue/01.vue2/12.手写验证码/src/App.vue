<template>
  <div>
    <!-- <VerifyCode :number="6" :success="success" /> -->
    <CountDown />
  </div>
</template>

<script>
import CountDown from './components/countDown.vue'
// import VerifyCode from './components/VerifyCode'
export default {
  name: 'App',
  components: {
    // VerifyCode,
    CountDown,
  },
  methods: {},
}
</script>

<style scoped>
</style>
