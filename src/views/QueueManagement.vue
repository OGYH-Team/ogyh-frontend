<template>
  <div>
    <div class="flex flex-row gap-x-6">
      <div class="flex-1 p-4 card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        quisquam sequi quasi mollitia magni obcaecati hic vitae eum rem illo!
      </div>
      <div class="flex-1 p-4 card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        quisquam sequi quasi mollitia magni obcaecati hic vitae eum rem illo!
      </div>
      <div class="flex-1 p-4 card">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
        quisquam sequi quasi mollitia magni obcaecati hic vitae eum rem illo!
      </div>
    </div>
    <div class="card mt-6">
      <div class="flex justify-between items-center p-4">
        <h3 class="font-bold text-xl text-purple-700">Queue Table</h3>
        <button>Update</button>
      </div>
      <ogyh-table
        v-if="timeSlots.length"
        :headers="tableHeaders"
        :items="mappedTimeSlots"
        haveCheckbox
      >
        <template #tableItem="{ item }">
          <td class="table-item">{{ item.citizen_id }}</td>
          <td class="table-item">{{ item.citizen_data.name }}</td>
          <td class="table-item">{{ item.citizen_data.surname }}</td>
          <td class="table-item">{{ item.citizen_data.occupation }}</td>
          <td class="table-item">{{ item.site_name }}</td>
          <td class="table-item">{{ item.site_name }}</td>
          <td class="table-item">{{ item.site_name }}</td>
        </template>
      </ogyh-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import OgyhTable from '@/components/OgyhTable.vue'

export default Vue.extend({
  components: {
    OgyhTable
  },
  name: 'QueueManagement',
  data() {
    return {
      tableHeaders: [
        'Citizen Id',
        'Name',
        'Surname',
        'Occupation',
        'Site',
        'Date',
        'Time'
      ]
    }
  },
  computed: {
    ...mapState('queue', ['timeSlots']),
    mappedTimeSlots() {
      return this.timeSlots.reduce(
        (acc, timeSlot) => [...timeSlot.reservations, ...acc],
        []
      )
    }
  },
  methods: {
    ...mapActions('queue', {
      fetchQueueTimeSlots: 'fetchQueueTimeSlots'
    })
  },
  async created() {
    await this.fetchQueueTimeSlots()
  }
})
</script>

<style>
@layer components {
  .table-item {
    @apply p-3 px-4;
  }
}
</style>
