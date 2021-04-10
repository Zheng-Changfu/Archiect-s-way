<template>
  <div class="container">
    <input
      type="number"
      v-for="(item, index) in number"
      :key="index"
      v-focus="{ index, vm }"
      :ref="index"
      v-model="codes[index]"
    />
    <button @click="codes = []">重新输入</button>
  </div>
</template>

<script>
export default {
  name: 'VerifyCode',
  props: {
    number: {
      type: Number,
      default: () => 4,
    },
    success: {
      type: Function,
      default: () => {},
    },
  },
  directives: {
    focus: {
      inserted(el, bindings) {
        if (bindings.value.index === 0) {
          const vm = bindings.value.vm
          vm.$nextTick(() => {
            el.focus()
          })
        }
      },
    },
  },
  data() {
    return {
      vm: this,
      codes: [],
    }
  },
  methods: {
    verify(newVal) {
      let failIndex = -1
      const verifyReg = /(\d{2,}),?/
      let res = newVal.join(',').match(verifyReg)
      if (res) {
        const verifyStr = newVal.join(',').slice(0, res.index)
        const matchres = verifyStr.match(/,/g)
        const count = matchres ? matchres.length : 0
        failIndex = res.index - count
      }
      return failIndex
    },
  },
  watch: {
    codes(newVal) {
      const length = this.codes.length
      const failIndex = this.verify(newVal)
      console.log(failIndex) //
      if (failIndex !== -1) {
        this.codes[failIndex] = this.codes[failIndex].slice(-1)
      }
      this.$refs[length]
        ? this.$refs[length][0].focus()
        : this.$refs[length - 1][0].blur()
      if (this.number === this.codes.length) {
        this.success(this.codes.join(''))
      }
    },
  },
}
</script>

<style scoped>
.container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
input {
  width: 50px;
  border: 0;
  border-bottom: 1px solid #ccc;
  height: 30px;
  text-align: center;
  margin-right: 5px;
}
input[type='number']:focus {
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
