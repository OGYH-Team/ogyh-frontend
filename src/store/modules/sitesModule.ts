import { ActionContext } from 'vuex'
import { Site, SitesModuleState, RootState } from '../types'
import axios from '@/httpClient'

const sitesModule = {
  namespaced: true,
  state(): SitesModuleState {
    return {
      sites: [] as Array<Site>
    }
  },
  mutations: {
    setSites(state: SitesModuleState, sites: Array<Site>): void {
      state.sites = sites
    }
  },
  actions: {
    async fetchSites({
      commit
    }: ActionContext<SitesModuleState, RootState>): Promise<void> {
      const { data } = await axios.get(
        'https://ogyh-backend.herokuapp.com/api/sites'
      )
      commit('setSites', data.response)
    },
    async addNewSite(
      context: ActionContext<SitesModuleState, RootState>,
      payload: Site
    ): Promise<void> {
      await axios.post('https://ogyh-backend.herokuapp.com/api/site', payload)
    },
    async deleteSite(
      context: ActionContext<SitesModuleState, RootState>,
      id: string
    ): Promise<void> {
      await axios.delete(`https://ogyh-backend.herokuapp.com/api/site/${id}`)
    }
  }
}

export default sitesModule
