<template>
  <div v-if="isShow">
    <overlay :is-show="isShow" @click="onCloseDialog"></overlay>
    <div class="card dialog">
      <div class="p-4">
        <slot name="dialog-title"></slot>
      </div>
      <div class="p-4">
        <slot name="dialog-body"></slot>
      </div>
      <div class="p-4">
        <slot name="dialog-actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Overlay from '@/components/Overlay.vue'

export default Vue.extend({
  name: 'OgyhDialog',
  components: { Overlay },
  props: ['isShow'],
  methods: {
    onCloseDialog() {
      this.$emit('close')
    }
  }
})
</script>

<style>
@layer components {
  .dialog {
    @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    grid grid-cols-1 divide-y bg-white z-50 w-11/12 md:w-3/5 lg:w-2/4;
  }
}
</style>
