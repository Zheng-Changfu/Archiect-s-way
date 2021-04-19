import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './utils/directives'
import './plugins/vant'
import 'lib-flexible'
Object.entries(directives).forEach(([name, hook]) => {
  Vue.directive(name, hook)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
