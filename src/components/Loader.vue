<template>
  <overlay :is-show="isLoading">
    <spinner />
  </overlay>
</template>

<script>
import Vue from 'vue'
import Overlay from '@/components/Overlay.vue'
import Spinner from '@/components/Spinner.vue'

export default Vue.extend({
  name: 'Loader',
  components: {
    Overlay,
    Spinner
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style></style>
