<template>
  <div v-if="isShow" v-on="$listeners" class="overlay">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Overlay',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style>
@layer components {
  .overlay {
    @apply absolute w-screen h-screen flex items-center top-0 left-0
    justify-center bg-black bg-opacity-50 z-40;
  }
}
</style>
