import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPeopleArrows, faBuilding } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import store from './store'
import './assets/style.css'
import router from './router'

library.add(faPeopleArrows, faBuilding)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
