<template>
  <input
    v-bind="$attrs"
    v-on="$listeners"
    class="
      border border-transparent
      shadow-md
      rounded-md
      w-full
      px-3
      py-2
      focus:outline-none focus:ring-2 focus:ring-purple-600
    "
  />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhTextField',
  props: ['value'],
  methods: {
    onTextInputChange(e) {
      this.$emit(e.target.value)
    }
  }
})
</script>

<style></style>
