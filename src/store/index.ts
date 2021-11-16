import Vue from 'vue'
import Vuex from 'vuex'
import appModule from './appModule'
import queueModule from './queueModule'
import { RootState } from './types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    app: appModule,
    queue: queueModule
  }
})
