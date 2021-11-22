<template>
  <div v-if="isLoading" class="overlay">
    <spinner />
  </div>
</template>

<script>
import Vue from 'vue'
import Spinner from '@/components/Spinner.vue'

export default Vue.extend({
  name: 'Loader',
  components: {
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

<style>
@layer components {
  .overlay {
    @apply w-screen h-screen absolute flex items-center justify-center bg-black bg-opacity-50 z-50;
  }
}
</style>
