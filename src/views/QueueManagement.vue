<template>
  <div>
    <div class="flex flex-row gap-x-6">
      <div
        class="flex-1 p-6 card flex"
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
      >
        <div class="flex-1 flex items-center justify-center">
          <font-awesome-icon
            :icon="card.icon"
            size="4x"
            class="text-indigo-600"
          />
        </div>
        <div class="flex-1 flex flex-col items-center">
          <span class="text-gray-500 font-semibold">{{ card.text }}</span>
          <span class="font-extrabold text-5xl text-green-400">
            {{ card.count }}
          </span>
        </div>
      </div>
    </div>
    <div class="card mt-6">
      <ogyh-table
        v-if="timeSlots.length"
        :headers="tableHeaders"
        :items="mappedTimeSlots"
        itemKey="citizen_id"
        haveCheckbox
      >
        <template #table-head="{ selectedItemsCount }">
          <div class="flex justify-between items-center p-4">
            <p class="font-bold text-xl text-purple-700">
              Queue Table
              <font-awesome-icon
                icon="sync-alt"
                class="ml-2 cursor-pointer"
                @click="onUpdateQueueTimeSlots"
              />
            </p>
            <div class="actions">
              <button
                class="btn btn-primary"
                @click="() => onOpenConfirmationDialog('all')"
              >
                Report All
              </button>
              <button
                class="btn btn-primary outlined"
                :disabled="!selectedItemsCount"
                @click="() => onOpenConfirmationDialog('selected')"
              >
                Report Selected
                <span v-if="selectedItemsCount">
                  ({{ selectedItemsCount }})
                </span>
              </button>
            </div>
          </div>
        </template>
        <template #table-item="{ item }">
          <td>{{ item.citizen_id }}</td>
          <td>{{ item.citizen_data.name }}</td>
          <td>{{ item.citizen_data.surname }}</td>
          <td>{{ item.citizen_data.occupation }}</td>
          <td>{{ item.site_name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
        </template>
      </ogyh-table>
    </div>
    <confirmation-dialog
      :is-show="dialogData.isDialogOpened"
      :title="dialogData.title"
      :body="dialogData.body"
      @close="onCloseConfirmationDialog"
      @agree="onSendReport"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import OgyhTable from '@/ogyhComponents/OgyhTable.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

export default Vue.extend({
  components: {
    OgyhTable,
    ConfirmationDialog
  },
  name: 'QueueManagement',
  data() {
    return {
      cards: [
        { icon: 'hotel', text: 'Sites', count: 3 },
        { icon: 'users', text: 'Reservations', count: 100 },
        { icon: 'hourglass-half', text: 'Round', count: 9 }
      ],
      tableHeaders: [
        'Citizen Id',
        'Name',
        'Surname',
        'Occupation',
        'Site',
        'Date',
        'Time'
      ],
      dialogData: {
        title: '',
        body: '',
        isDialogOpened: false,
        actionType: ''
      }
    }
  },
  computed: {
    ...mapState('queue', ['timeSlots']),
    mappedTimeSlots() {
      const timeSlots = this.timeSlots.reduce((acc, timeSlot) => {
        const reservationsByDateTime = timeSlot.reservations.map(
          (reservation) => ({
            date: timeSlot.date,
            time: timeSlot.time_str,
            ...reservation
          })
        )
        return [...acc, ...reservationsByDateTime]
      }, [])

      return timeSlots
    }
  },
  methods: {
    ...mapActions('queue', {
      fetchQueueTimeSlots: 'fetchQueueTimeSlots',
      updateQueueTimeSlots: 'updateQueueTimeSlots'
    }),
    ...mapWaitingActions('queue', {
      fetchQueueTimeSlots: 'loading',
      updateQueueTimeSlots: 'loading'
    }),
    async onUpdateQueueTimeSlots() {
      await this.updateQueueTimeSlots()
      await this.fetchQueueTimeSlots()
    },
    onCloseConfirmationDialog() {
      this.dialogData.isDialogOpened = false
    },
    onOpenConfirmationDialog(actionType) {
      this.dialogData.actionType = actionType
      if (actionType === 'all') {
        this.dialogData.title = 'Report to all confirmation'
        this.dialogData.body =
          'Are you sure to report queue information to all reservations?'
      } else {
        this.dialogData.title = 'Report to selected confirmation'
        this.dialogData.body =
          'Are you sure to report queue information to selected reservations?'
      }
      this.dialogData.isDialogOpened = true
    },
    onSendReport() {
      switch (this.dialogData.actionType) {
        case 'all':
          this.onCloseConfirmationDialog()
          break
        case 'selected':
          this.onCloseConfirmationDialog()
          break
        default:
          this.onCloseConfirmationDialog()
          break
      }
    }
  },
  async created() {
    await this.fetchQueueTimeSlots()
  }
})
</script>

<style>
@layer components {
  .actions {
    @apply flex gap-3;
  }
}
</style>
