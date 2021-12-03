<template>
  <form
    class="w-full md:w-80 mx-auto flex flex-col pt-8"
    @submit.prevent="onSubmitWalkInReport"
  >
    <h1 class="text-center font-extrabold text-xl text-purple-700">
      Report Vaccine Taken (Walk-in)
    </h1>
    <label for="username" class="font-semibold mt-3">Citizen ID</label>
    <ogyh-text-field
      type="text"
      class="mt-2"
      name="citizenId"
      placeholder="Enter Citizen ID..."
      v-model="walkInForm.citizenId"
      :error="errors.citizenId"
      @input="() => clearError()"
    />
    <span v-if="errors.citizenId" class="error-message">
      {{ errors.citizenId }}
    </span>
    <label for="username" class="font-semibold mt-3">Site</label>
    <ogyh-drop-down
      class="mt-2"
      :menus="sites"
      input-style
      :placeholder="walkInForm.site.name || 'Select site...'"
      :haveSelected="!!walkInForm.site.name"
      :error="!!errors.site"
      @item-selected="onSiteSelect"
    >
      <template #menu-item="{ menuItem }">
        {{ menuItem.name }}
      </template>
    </ogyh-drop-down>
    <span v-if="errors.site" class="error-message">
      {{ errors.site }}
    </span>
    <label for="username" class="font-semibold mt-3">Vaccine Name</label>
    <ogyh-drop-down
      class="mt-2"
      :menus="vaccines"
      input-style
      :haveSelected="!!walkInForm.vaccineName"
      :placeholder="walkInForm.vaccineName || 'Select vaccine...'"
      :error="!!errors.vaccineName"
      @item-selected="onVaccineNameSelect"
    >
      <template #menu-item="{ menuItem }">
        {{ menuItem }}
      </template>
    </ogyh-drop-down>
    <span v-if="errors.vaccineName" class="error-message">
      {{ errors.vaccineName }}
    </span>
    <button class="btn btn-accent mt-4 block" type="submit">Submit</button>
    <p v-if="submitError.isError" class="error-message mt-4">
      {{ submitError.message }}
    </p>
  </form>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import OgyhTextField from '@/ogyhComponents/OgyhTextField.vue'
import OgyhDropDown from '@/ogyhComponents/OgyhDropDown.vue'

export default Vue.extend({
  name: 'WalkInReportForm',
  components: {
    OgyhTextField,
    OgyhDropDown
  },
  data() {
    return {
      walkInForm: {
        citizenId: '',
        vaccineName: '',
        site: {}
      },
      errors: {
        citizenId: '',
        site: '',
        vaccineName: ''
      },
      submitError: {
        message: '',
        isError: false
      },
      vaccines: ['Astra', 'Pfizer', 'Sinovac', 'Sinopharm']
    }
  },
  computed: {
    ...mapState('sites', ['sites', 'selectedSite'])
  },
  methods: {
    ...mapActions('queue', {
      sendReportTakenWalkin: 'sendReportTakenWalkin',
      fetchQueueTimeSlots: 'fetchQueueTimeSlots'
    }),
    ...mapActions('sites', {
      fetchSites: 'fetchSites'
    }),
    ...mapWaitingActions('queue', {
      sendReportTakenWalkin: 'loading',
      fetchQueueTimeSlots: 'loading'
    }),
    ...mapWaitingActions('sites', {
      fetchSites: 'loading'
    }),
    clearError() {
      this.errors.citizenId = ''
    },
    async onSubmitWalkInReport() {
      if (
        !(
          this.walkInForm.citizenId &&
          this.walkInForm.site.name &&
          this.walkInForm.vaccineName
        )
      ) {
        this.errors = {
          citizenId: !this.walkInForm.citizenId
            ? 'Citizen ID field is missing'
            : '',
          site: !this.walkInForm.site.name ? 'Site field is missing' : '',
          vaccineName: !this.walkInForm.vaccineName
            ? 'Vaccine name field is missing'
            : ''
        }
        return
      }

      try {
        await this.sendReportTakenWalkin({
          siteId: this.walkInForm.site.id,
          citizenId: this.walkInForm.citizenId,
          vaccineName: this.walkInForm.vaccineName
        })
        this.resetForm()
      } catch (e) {
        this.submitError = 'Report vaccine taken failed'
        console.error(e)
      }
    },
    onSiteSelect(site) {
      this.walkInForm.site = site
      this.errors.site = ''
    },
    onVaccineNameSelect(vaccine) {
      this.walkInForm.vaccineName = vaccine
      this.errors.vaccineName = ''
    },
    resetForm() {
      this.walkInForm = {
        citizenId: '',
        vaccineName: '',
        site: {}
      }
    }
  },
  async created() {
    await this.fetchSites()
  }
})
</script>

<style></style>
