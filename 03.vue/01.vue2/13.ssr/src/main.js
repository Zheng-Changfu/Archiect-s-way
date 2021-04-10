import Vue from 'vue'
import App from './App.vue'
export default () => {
  const app = new Vue({
    render: h => h(App)
  })
  return { app }
}