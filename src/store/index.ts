import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

interface appModuleState {
  navTitle: string
}

const appModule = {
  namespaced: true,
  state: () => ({
    navTitle: ''
  }),
  mutations: {
    setNavTitle: (state: appModuleState, payload: { title: string }) => {
      state.navTitle = payload.title
    }
  },
  actions: {}
}

export default new Vuex.Store({
  modules: {
    appModule
  }
})
