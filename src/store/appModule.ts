import { AppModuleState } from './types'

const appModule = {
  namespaced: true,
  state(): AppModuleState {
    return {
      navTitle: '',
      isSideNavOpen: false
    }
  },
  mutations: {
    setNavTitle(state: AppModuleState, payload: { title: string }): void {
      state.navTitle = payload.title
    },
    toggleSideNav(state: AppModuleState): void {
      state.isSideNavOpen = !state.isSideNavOpen
    },
    closeSideNav(state: AppModuleState): void {
      state.isSideNavOpen = false
    }
  },
  actions: {}
}

export default appModule
