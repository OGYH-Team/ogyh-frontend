<template>
  <ogyh-dialog :is-show="isShow" @close="onCloseConfirmationDialog">
    <template #dialog-title>
      <h3 class="font-semibold text-lg text-indigo-700">{{ title }}</h3>
    </template>
    <template #dialog-body>
      <div class="flex flex-col items-center text-purple-700 text-center">
        <font-awesome-icon :icon="icon" size="7x" />
        <p class="pt-4 font-semibold">{{ body }}</p>
      </div>
    </template>
    <template #dialog-actions>
      <div class="flex items-center justify-evenly">
        <button class="btn btn-primary px-8" @click="onAgree">OK</button>
        <button
          class="btn btn-primary outlined px-8"
          @click="onCloseConfirmationDialog"
        >
          Cancel
        </button>
      </div>
    </template>
  </ogyh-dialog>
</template>

<script>
import Vue from 'vue'
import OgyhDialog from '@/ogyhComponents/OgyhDialog.vue'

export default Vue.extend({
  name: 'ConfirmationDialog',
  components: {
    OgyhDialog
  },
  props: {
    icon: {
      type: String,
      default: 'check-circle'
    },
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCloseConfirmationDialog() {
      this.$emit('close')
    },
    onAgree() {
      this.$emit('agree')
    }
  }
})
</script>

<style></style>
