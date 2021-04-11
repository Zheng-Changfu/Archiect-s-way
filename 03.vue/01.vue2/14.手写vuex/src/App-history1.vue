<template>
  <div>
    <h1>总模块</h1>
    <h1>姓名:{{ $store.state.name }}</h1>
    <h1>年纪:{{ $store.state.age }}</h1>
    <h1>计算年龄:{{ $store.getters.getAge }}</h1>
    <button @click="$store.commit('ageChange')">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块一</h1>
    <h1>姓名:{{ $store.state.a.name }}</h1>
    <h1>年纪:{{ $store.state.a.age }}</h1>
    <h1>计算年龄:{{ $store.getters['a/getAge'] }}</h1>
    <button @click="$store.commit('a/ageChange')">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块二</h1>
    <h1>姓名:{{ $store.state.b.name }}</h1>
    <h1>年纪:{{ $store.state.b.age }}</h1>
    <h1>计算年龄:{{ $store.getters['b/getAge'] }}</h1>
    <button @click="$store.commit('b/ageChange')">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块一的子模块</h1>
    <h1>姓名:{{ $store.state.a.c.name }}</h1>
    <h1>年纪:{{ $store.state.a.c.age }}</h1>
    <h1>计算年龄:{{ $store.getters['a/c/getAge'] }}</h1>
    <button @click="$store.commit('a/c/ageChange')">修改年纪</button>
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
