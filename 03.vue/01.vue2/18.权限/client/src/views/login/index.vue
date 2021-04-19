<template>
  <div>
    <Header title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as Types from '@/store/constants'
import Header from '@/components/Header'
const { mapActions } = createNamespacedHelpers('user')
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    ...mapActions([Types.SET_LOGIN]),
    async onSubmit(values) {
      await this[Types.SET_LOGIN](values)
      this.$router.push('/user')
    },
  },
  components: {
    Header,
  },
}
</script>

<style scoped>
</style>
