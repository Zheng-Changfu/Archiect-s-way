<template>
  <form @click.prevent>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'el-form',
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    validate(cb) {
      // 验证所有字段
      // 拿到所有的form-item组件，调用组件中的validate方法进行验证，返回结果
      const vc = this.$vchild('el-form-item')
      let i = 0
      vc.forEach((c) => {
        if (c.validate()) {
          i++
        }
      })
      let valid = Object.keys(this.rules).length === i ? true : false
      cb(valid)
    },
  },
}
</script>

<style scoped>
</style>
