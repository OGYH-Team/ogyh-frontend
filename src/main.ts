import Vue from 'vue'
import VueWait from 'vue-wait'
import Plugins from '@/plugins'

import App from './App.vue'
import store from './store'
import './assets/style.css'
import router from './router'
import axios from '@/httpClient'

Vue.config.productionTip = false
Vue.use(Plugins)

const accessToken = localStorage.getItem('accessToken')
if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  store.commit('app/setAuthStatus', !!accessToken)
}

new Vue({
  store,
  router,
  wait: new VueWait(),
  render: (h) => h(App)
}).$mount('#app')
