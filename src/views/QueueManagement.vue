<template>
  <div class="flex-grow flex flex-col">
    <div class="flex flex-row gap-2 lg:gap-6 xl:gap-16">
      <div
        class="flex-1 p-3 lg:p-6 card flex flex-col lg:flex-row"
        v-for="(card, cardIndex) in cards"
        :key="cardIndex"
      >
        <div class="flex-1 flex items-center justify-center text-indigo-600">
          <font-awesome-icon
            :icon="card.icon"
            size="2x"
            class="block lg:hidden"
          />
          <font-awesome-icon
            :icon="card.icon"
            size="3x"
            class="hidden lg:block"
          />
        </div>
        <div class="flex-1 flex flex-col items-center">
          <span class="text-gray-500 font-semibold text-sm lg:text-base">{{
            card.text
          }}</span>
          <span
            class="
              font-extrabold
              text-3xl
              md:text-4xl
              lg:text-5xl
              text-green-400
            "
          >
            {{ card.count ? card.count : '0' }}
          </span>
        </div>
      </div>
    </div>
    <div class="mt-4 flex items-center">
      <p class="font-semibold">Selected Site:</p>
      <ogyh-drop-down
        class="ml-2"
        :menus="sites"
        :placeholder="
          selectedSite.name ? selectedSite.name : 'Select site name...'
        "
        @item-selected="onMenuItemSelect"
      >
        <template #menu-item="{ menuItem }">
          {{ menuItem.name }}
        </template>
      </ogyh-drop-down>
    </div>
    <h1 class="text-red-500 font-semibold mt-2">{{ errorMessage }}</h1>
    <div v-if="timeSlots.length" class="card mt-2 flex-grow">
      <ogyh-table
        ref="queueTable"
        :headers="tableHeaders"
        :items="mappedTimeSlots"
        itemKey="citizen_id"
        :haveCheckbox="isAuth && !!timeSlots.length"
        @selected-update="onSelectedIdChanged"
      >
        <template #table-head="{ selectedItemsCount }">
          <div class="flex justify-between items-center p-4">
            <p class="font-bold text-xl text-purple-700">
              Queue Table
              <font-awesome-icon
                v-if="isAuth"
                icon="sync-alt"
                class="ml-2 cursor-pointer"
                @click="onUpdateQueueTimeSlots"
              />
            </p>
            <div class="actions" v-if="isAuth">
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
          <td class="text-center" v-if="isAuth">
            <font-awesome-icon
              icon="check"
              class="cursor-pointer"
              @click="() => onSendReportTaken(item.citizen_id)"
            />
          </td>
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
import OgyhDropDown from '@/ogyhComponents/OgyhDropDown.vue'

export default Vue.extend({
  components: {
    OgyhTable,
    ConfirmationDialog,
    OgyhDropDown
  },
  name: 'QueueManagement',
  data() {
    return {
      cards: [
        { icon: 'hotel', text: 'Sites' },
        { icon: 'users', text: 'Reservations' },
        { icon: 'hourglass-half', text: 'Round' }
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
      },
      errorMessage: '',
      selectedIds: []
    }
  },
  computed: {
    ...mapState('queue', ['timeSlots', 'selectedSite']),
    ...mapState('sites', ['sites']),
    ...mapState('app', ['isAuth']),
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
    },
    sitesCount() {
      const sites = this.timeSlots.reduce((acc, timeSlot) => {
        const sitesInTimeSlot = []
        timeSlot.reservations.forEach((reservation) => {
          const siteName = reservation.site_name
          if (!acc.includes(siteName)) {
            sitesInTimeSlot.push(siteName)
          }
        })
        return [...new Set([...acc, ...sitesInTimeSlot])]
      }, [])

      return sites.length
    }
  },
  methods: {
    ...mapActions('queue', {
      fetchQueueTimeSlots: 'fetchQueueTimeSlots',
      updateQueueTimeSlots: 'updateQueueTimeSlots',
      reportQueues: 'reportQueues',
      sendReportTaken: 'sendReportTaken'
    }),
    ...mapActions('sites', {
      fetchSites: 'fetchSites'
    }),
    ...mapWaitingActions('queue', {
      fetchQueueTimeSlots: 'loading',
      updateQueueTimeSlots: 'loading',
      reportQueues: 'loading',
      sendReportTaken: 'loading'
    }),
    ...mapWaitingActions('sites', {
      fetchSites: 'loading'
    }),
    async onUpdateQueueTimeSlots() {
      await this.updateQueueTimeSlots()
      await this.fetchQueueTimeSlots(this.selectedSite)
    },
    onCloseConfirmationDialog() {
      this.dialogData.isDialogOpened = false
    },
    onSelectedIdChanged(selectedIds) {
      this.selectedIds = selectedIds
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
    async onSendReport() {
      switch (this.dialogData.actionType) {
        case 'all': {
          this.onCloseConfirmationDialog()
          const allIds = this.mappedTimeSlots.map(
            (reservation) => reservation.citizen_id
          )
          await this.reportQueues(allIds)
          break
        }
        case 'selected':
          this.onCloseConfirmationDialog()
          await this.reportQueues(this.selectedIds)
          break
        default:
          this.onCloseConfirmationDialog()
          break
      }
      await this.onUpdateQueueTimeSlots()
      this.$refs.queueTable.resetSelected()
    },
    async onMenuItemSelect(menu) {
      if (menu.id === this.selectedSite.id) return
      this.fetchSiteTimeSlots(menu)
      this.$refs.queueTable.resetSelected()
    },
    async onSendReportTaken(id) {
      await this.sendReportTaken([id])
      await this.onUpdateQueueTimeSlots()
      this.$refs.queueTable.resetSelected()
    },
    async fetchSiteTimeSlots(site) {
      try {
        await this.fetchQueueTimeSlots(site)
        this.errorMessage = ''
      } catch (e) {
        this.errorMessage =
          'Error occured during getting queue from selected site'
      }
    }
  },
  async created() {
    if (this.isAuth) {
      this.tableHeaders = [
        'Citizen Id',
        'Name',
        'Surname',
        'Occupation',
        'Site',
        'Date',
        'Time',
        'Actions'
      ]
    }
    await this.fetchSites(true)
    if (this.sites.length) {
      await this.fetchSiteTimeSlots(this.sites[0])
    }
    this.cards = [
      { icon: 'hotel', text: 'Sites', count: this.sitesCount },
      {
        icon: 'users',
        text: 'Reservations',
        count: this.mappedTimeSlots.length
      },
      { icon: 'hourglass-half', text: 'Round', count: 0 }
    ]
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
