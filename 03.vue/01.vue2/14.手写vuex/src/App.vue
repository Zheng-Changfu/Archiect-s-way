<template>
  <div>
    <h1>总模块</h1>
    <h1>姓名:{{ name }}</h1>
    <h1>年纪:{{ age }}</h1>
    <h1>计算年龄:{{ getAge }}</h1>
    <button @click="ageChange">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块一</h1>
    <h1>姓名:{{ aName }}</h1>
    <h1>年纪:{{ $store.state.a.age }}</h1>
    <h1>计算年龄:{{ $store.getters['a/getAge'] }}</h1>
    <button @click="ageChange1">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块二</h1>
    <h1>姓名:{{ $store.state.b.name }}</h1>
    <h1>年纪:{{ $store.state.b.age }}</h1>
    <h1>计算年龄:{{ $store.getters['b/getAge'] }}</h1>
    <button @click="ageChange2">修改年纪</button>
    <hr />
    <hr />
    <hr />
    <h1>模块一的子模块</h1>
    <h1>姓名:{{ $store.state.a.c.name }}</h1>
    <h1>年纪:{{ $store.state.a.c.age }}</h1>
    <h1>计算年龄:{{ $store.getters['a/c/getAge'] }}</h1>
    <button @click="ageChange3">修改年纪</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from './vuex'
export default {
  name: 'App',
  computed: {
    // ...mapState(['name', 'age']),
    ...mapState({
      name: (state) => state.name,
      age: (state) => state.age,
      aName: (state) => state.a.name,
    }),
    ...mapGetters(['getAge']),
    // name() {
    //   return this.$store.state.name
    // },
    // age() {
    //   return this.$store.state.age
    // },
    // getAge() {
    //   return this.$store.getters.getAge
    // },
    // aName() {
    //   return this.$store.state.a.name
    // },
  },
  methods: {
    // ...mapMutations(['ageChange', 'a/c/ageChange','b/ageChange','a/ageChange']),
    ...mapMutations({
      ageChange: 'ageChange',
      ageChange1: 'a/ageChange',
      ageChange2: 'b/ageChange',
      ageChange3: 'a/c/ageChange',
    }),
  },
}
</script>

<style>
</style>
