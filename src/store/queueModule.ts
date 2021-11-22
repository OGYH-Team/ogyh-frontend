import { ActionContext } from 'vuex'
import axios from '../httpClient'
import { QueueModuleState, RootState, TimeSlot } from './types'

const queueModule = {
  namespaced: true,
  state(): QueueModuleState {
    return {
      timeSlots: []
    }
  },
  mutations: {
    setTimeSlots: (
      state: QueueModuleState,
      timeSlots: Array<TimeSlot>
    ): void => {
      state.timeSlots = timeSlots
    }
  },
  actions: {
    async fetchQueueTimeSlots({
      commit
    }: ActionContext<QueueModuleState, RootState>): Promise<void> {
      const { data } = await axios.get(
        'https://ogyh-backend.herokuapp.com/api/time_slots'
      )
      commit('setTimeSlots', data.time_slots)
    },
    async updateQueueTimeSlots(): Promise<void> {
      await axios.get('https://ogyh-backend.herokuapp.com/api/update_queue')
    }
  }
}

export default queueModule
