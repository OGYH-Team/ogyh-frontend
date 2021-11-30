import { ActionContext } from 'vuex'
import { AppModuleState, RootState } from '../types'
import axios from '@/httpClient'

const appModule = {
  namespaced: true,
  state(): AppModuleState {
    return {
      navTitle: '',
      isSideNavOpen: false,
      isAuth: false
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
    },
    setAuthStatus(state: AppModuleState, status: boolean): void {
      state.isAuth = status
    }
  },
  actions: {
    async signIn(
      { commit }: ActionContext<AppModuleState, RootState>,
      {
        username,
        password
      }: {
        username: string
        password: string
      }
    ): Promise<void> {
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      const { data } = await axios.post('login', params, config)
      const { access_token } = data
      localStorage.setItem('accessToken', access_token)
      commit('setAuthStatus', !!access_token)
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`
    }
  }
}

export default appModule
