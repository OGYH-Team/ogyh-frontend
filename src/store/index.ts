import Vue from 'vue'
import Vuex from 'vuex'
import appModule from './appModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appModule
  }
})
