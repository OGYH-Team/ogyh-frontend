import { ActionContext } from 'vuex'
import axios from '@/httpClient'
import { QueueModuleState, RootState, TimeSlot, Site } from '../types'

const queueModule = {
  namespaced: true,
  state(): QueueModuleState {
    return {
      timeSlots: [] as Array<TimeSlot>,
      selectedSite: {} as Site
    }
  },
  mutations: {
    setTimeSlots(state: QueueModuleState, timeSlots: Array<TimeSlot>): void {
      state.timeSlots = timeSlots
    },
    setSelectedSite(state: QueueModuleState, site: Site): void {
      state.selectedSite = site
    }
  },
  actions: {
    async fetchQueueTimeSlots(
      { commit }: ActionContext<QueueModuleState, RootState>,
      site: Site
    ): Promise<void> {
      const { data } = await axios.get(`api/site/${site.id}/queues`)
      commit('setSelectedSite', site)
      commit('setTimeSlots', data.time_slots)
    },
    async updateQueueTimeSlots({
      state
    }: ActionContext<QueueModuleState, RootState>): Promise<void> {
      await axios.get(`api/site/${state.selectedSite.id}/queues/update_queue`)
    },
    async reportQueues(
      { state }: ActionContext<QueueModuleState, RootState>,
      citizen_ids: Array<string>
    ): Promise<void> {
      await axios.post(`api/site/${state.selectedSite.id}/queues/report`, {
        citizen_ids
      })
    },
    async sendReportTaken(
      { state }: ActionContext<QueueModuleState, RootState>,
      citizen_ids: Array<string>
    ): Promise<void> {
      await axios.post(
        `api/site/${state.selectedSite.id}/queues/report-taken`,
        {
          citizen_ids
        }
      )
    }
  }
}

export default queueModule
