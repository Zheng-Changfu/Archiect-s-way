import Vue from 'vue'
import App from './App.vue'
import globalApi from './global-api'
Vue.config.productionTip = false
// 原型上的方法
globalApi(Vue)
new Vue({
  render: h => h(App),
}).$mount('#app')
