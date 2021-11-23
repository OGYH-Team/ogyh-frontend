import Vue from 'vue'
import Vuex from 'vuex'
import allModules from './modules'
import { RootState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    ...allModules
  }
})
