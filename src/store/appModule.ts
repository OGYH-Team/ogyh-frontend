import { AppModuleState } from './types'

const appModule = {
  namespaced: true,
  state(): AppModuleState {
    return {
      navTitle: ''
    }
  },
  mutations: {
    setNavTitle: (state: AppModuleState, payload: { title: string }): void => {
      state.navTitle = payload.title
    }
  },
  actions: {}
}

export default appModule
