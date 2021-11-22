import _Vue from 'vue'
import Vuex from 'vuex'
import VueWait from 'vue-wait'
import FontAwesomePlugin from './fontAwesomeIcon'

export default {
  install(Vue: typeof _Vue): void {
    Vue.use(Vuex)
    Vue.use(VueWait)
    Vue.use(FontAwesomePlugin)
  }
}
