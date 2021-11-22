import Vue from 'vue'
import VueWait from 'vue-wait'
import Plugins from '@/plugins'

import App from './App.vue'
import store from './store'
import './assets/style.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(Plugins)

new Vue({
  store,
  router,
  wait: new VueWait(),
  render: (h) => h(App)
}).$mount('#app')
