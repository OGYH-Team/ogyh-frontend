<template>
  <div v-if="isShow" @click="toggleSideNav" class="overlay">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapMutations } from 'vuex'

export default Vue.extend({
  name: 'Overlay',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations('app', {
      toggleSideNav: 'toggleSideNav'
    })
  }
})
</script>

<style>
@layer components {
  .overlay {
    @apply w-screen h-screen absolute flex items-center 
    justify-center bg-black bg-opacity-50 z-40;
  }
}
</style>
