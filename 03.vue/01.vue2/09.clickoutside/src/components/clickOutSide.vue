<template>
  <div>
    <div class="outer" v-out-side="hide" v-if="flag">
      <input type="text" @focus="show" />
      <p v-show="isShow">面板</p>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: 'clickOutSide',
  data() {
    return {
      isShow: false,
      flag: true,
    }
  },
  directives: {
    'out-side': {
      bind(el, bindings) {
        const handler = (e) => {
          console.log(111)
          const targetSource = e.target
          // 如果点击的不是目标源，就隐藏
          if (!el.contains(targetSource)) {
            // 隐藏
            bindings.value()
          }
        }
        el.handler = handler
        document.addEventListener('click', handler)
      },
      unbind(el) {
        // console.log(args, 'args')
        // 移除事件
        document.removeEventListener('click', el.handler)
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.flag = false
    }, 3000)
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      if (this.isShow) {
        this.isShow = false
      }
    },
  },
}
</script>

<style scoped>
.outer {
  display: inline-flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid #ccc;
}
</style>
