interface appModuleState {
  navTitle: string
}

const appModule = {
  namespaced: true,
  state: (): appModuleState => ({
    navTitle: ''
  }),
  mutations: {
    setNavTitle: (state: appModuleState, payload: { title: string }): void => {
      state.navTitle = payload.title
    }
  },
  actions: {}
}

export default appModule
