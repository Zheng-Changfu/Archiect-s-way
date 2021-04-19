<template>
  <div>
    <Header title="个人中心" />
    <template v-if="hasPermission">
      <div class="userinfo">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi1.sinaimg.cn%2FIT%2F2010%2F0419%2F201041993511.jpg&refer=http%3A%2F%2Fi1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621147939&t=b6e73bc7a1c0c563809be26dc3f28636"
          alt=""
        />
        <h1>{{ username }}</h1>
      </div>
      <!-- 按钮权限 -->
      <van-button type="primary" v-has-permission="'add'">增加</van-button>
      <van-button type="danger" v-has-permission="'remove'">删除</van-button>
      <van-button type="warning" v-has-permission="'edit'">更新</van-button>
      <van-button type="info" v-has-permission="'get'">查看</van-button>
      <van-tabs v-model="active">
        <van-tab
          v-for="item in menulist"
          :title="item.path"
          :key="item.path"
          :to="'/user' + item.path"
        >
        </van-tab>
      </van-tabs>
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="tologin">
        <van-button type="info" class="btn" to="/login">去登录</van-button>
      </div>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Header from '@/components/Header'
const { mapState } = createNamespacedHelpers('user')
export default {
  name: 'User',
  computed: {
    ...mapState(['hasPermission', 'username', 'menulist']),
  },
  components: {
    Header,
  },
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style lang='scss' scoped>
.tologin {
  .btn {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
.userinfo {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  h1 {
    margin: 0;
    padding: 0;
    color: $bgcolor;
    font-size: 14px;
  }
  &::after {
    content: '';
    position: absolute;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi1.sinaimg.cn%2FIT%2F2010%2F0419%2F201041993511.jpg&refer=http%3A%2F%2Fi1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621147939&t=b6e73bc7a1c0c563809be26dc3f28636')
      center center no-repeat;
    filter: blur(3px);
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
}
</style>
