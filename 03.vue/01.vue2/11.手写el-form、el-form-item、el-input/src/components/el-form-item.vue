<template>
  <div>
    <label v-if="label">{{ label }}:</label>
    <slot></slot>
    <!-- 错误消息 -->
    <div class="error">{{ errMessage }}</div>
  </div>
</template>

<script>
import validate from './validate'
export default {
  name: 'el-form-item',
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      errMessage: '',
    }
  },
  mounted() {
    // input输入时需要实时验证
    this.$on('changeValue', this.validate)
  },
  methods: {
    validate() {
      if (!this.prop) return false
      // 需要拿到数据和规则,然后通过async-validate进行验证
      // 数据现在在form组件中，还是一样，需要找到form组件，拿到数据
      const formInstance = this.$dispatch('el-form')
      const { model, rules } = formInstance
      const field = this.prop
      const value = model[field]
      let res
      validate(
        field,
        rules[field][0],
        { [field]: value },
        () => {
          this.errMessage = ''
          res = true
        },
        (err) => {
          this.errMessage = err[0].message
          res = false
        }
      )
      return res
    },
  },
}
</script>

<style scoped>
.error {
  display: inline-block;
  color: red;
}
</style>
