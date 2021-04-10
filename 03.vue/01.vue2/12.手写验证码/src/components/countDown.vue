<template>
  <div>
    <h1>倒计时,秒杀时间还剩下:{{ timer }}</h1>
  </div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    time: {
      type: Number,
      default: () => 30,
    },
  },
  data() {
    return {
      timer: '',
      totalSecond: this.time * 60,
    }
  },
  mounted() {
    this.countDown()
    this.timers = setInterval(() => {
      if (this.totalSecond === -1) {
        // 时间到
        clearInterval(this.timers)
        return
      }
      this.countDown()
    }, 1000)
  },
  methods: {
    countDown() {
      const { totalSecond } = this
      // 秒换算成时分秒
      const hh = totalSecond / 3600 < 1 ? 0 : Math.floor(totalSecond / 3600)
      const mm = Math.floor(totalSecond / 60 - hh * 60)
      const ss = totalSecond - (hh * 3600 + mm * 60)
      const zh = hh < 10 ? '0' + hh : hh
      const zm = mm < 10 ? '0' + mm : mm
      const zs = ss < 10 ? '0' + ss : ss
      this.timer = `${zh}小时${zm}分钟${zs}秒`
      this.totalSecond--
    },
  },
}
</script>

<style>
</style>
