<template>
  <div @click="show">Bar</div>
</template>

<script>
export default {
  name: 'Bar',
  methods: {
    show() {
      alert('bar')
    },
  },
}
</script>

<style scoped>
</style>
