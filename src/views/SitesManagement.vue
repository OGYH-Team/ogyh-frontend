<template>
  <div class="card">
    <ogyh-table v-if="sites.length" :items="sites" :headers="tableHeaders">
      <template #table-head>
        <div class="p-4 flex items-center justify-between">
          <p class="font-bold text-xl text-purple-700">All Sites</p>
          <button class="btn btn-primary" @click="isDialogOpen = true">
            Add Site <font-awesome-icon icon="building" class="ml-1" />
          </button>
        </div>
      </template>
      <template #table-item="{ item, index }">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.location.formatted_address }}</td>
        <td>
          <font-awesome-icon
            class="cursor-pointer"
            icon="trash-alt"
            @click="onDeleteSite(item.id)"
          />
        </td>
      </template>
    </ogyh-table>
    <ogyh-dialog :is-show="isDialogOpen" @close="onCloseDialog">
      <template #dialog-title>
        <h3 class="font-semibold text-lg text-indigo-700">Add New Site</h3>
      </template>
      <template #dialog-body>
        <div class="grid font-semibold">
          <label for="name" class="text-sm pl-1">Site Name</label>
          <ogyh-text-field
            class="my-2 mb-4"
            placeholder="Enter Site Name..."
            name="name"
            :value="newSiteForm.name"
            @input="(value) => onSiteNameInputChange(value)"
          />
          <label for="location" class="text-sm pl-1">Location</label>
          <vue-google-autocomplete
            id="map"
            classname="ogyh-field my-2"
            placeholder="Enter Location..."
            @placechanged="getAddressData"
            :country="['th']"
          />
        </div>
      </template>
      <template #dialog-actions>
        <div class="flex items-center justify-evenly">
          <button class="btn btn-primary px-8" @click="onAddNewSite">
            Submit
          </button>
          <button class="btn btn-primary outlined px-8" @click="onCloseDialog">
            Cancel
          </button>
        </div>
      </template>
    </ogyh-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import OgyhTable from '@/ogyhComponents/OgyhTable.vue'
import OgyhDialog from '@/ogyhComponents/OgyhDialog.vue'
import OgyhTextField from '@/ogyhComponents/OgyhTextField.vue'

export default Vue.extend({
  name: 'SitesManagement',
  components: {
    OgyhTable,
    OgyhDialog,
    OgyhTextField,
    VueGoogleAutocomplete
  },
  data() {
    return {
      tableHeaders: ['No.', 'Name', 'Location', 'Actions'],
      isDialogOpen: false,
      newSiteForm: {
        name: '',
        location: null
      }
    }
  },
  computed: {
    ...mapState('sites', ['sites'])
  },
  methods: {
    ...mapActions('sites', {
      fetchSites: 'fetchSites',
      addNewSite: 'addNewSite',
      deleteSite: 'deleteSite'
    }),
    ...mapWaitingActions('sites', {
      fetchSites: 'loading',
      addNewSite: 'loading',
      deleteSite: 'loading'
    }),
    onCloseDialog() {
      this.isDialogOpen = false
    },
    onSiteNameInputChange(value) {
      this.newSiteForm.name = value
    },
    async onAddNewSite() {
      if (!(this.newSiteForm.name && this.newSiteForm.location)) return
      this.onCloseDialog()
      try {
        await this.addNewSite(this.newSiteForm)
        await this.fetchSites()
      } catch (e) {
        console.error(e)
      }
    },
    async onDeleteSite(siteId) {
      await this.deleteSite(siteId)
      await this.fetchSites()
    },
    getAddressData(addressData, placeResultData) {
      this.newSiteForm.location = {
        formatted_address: placeResultData.formatted_address,
        country: addressData.country,
        postal_code: addressData.postal_code,
        route: addressData.route,
        city: addressData.administrative_area_level_1,
        coordinates: {
          latitude: addressData.latitude,
          longitude: addressData.longitude
        }
      }
    }
  },
  async created() {
    await this.fetchSites()
  }
})
</script>

<style></style>
