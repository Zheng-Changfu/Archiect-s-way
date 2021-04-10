<template>
  <div>
    <h1>姓名:{{ $store.state.name }}</h1>
    <h1>年龄:{{ $store.state.age }}</h1>
    <h1>计算年龄:{{ $store.getters.getAge }}</h1>
    <!-- 此方式直接修改在开启严格模式下会报错,必须要通过mutaion来进行添加，而且mutaion内部不能异步修改 -->
    <button @click="$store.state.age++">错误修改年龄</button>
    <button @click="$store.dispatch('ageChange')">异步错误修改年龄</button>
    <button @click="$store.commit('ageChange')">正确修改年龄</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    console.log(this, 'this') // 每个组件中都会有一个$store属性
  },
}
</script>

<style>
</style>
