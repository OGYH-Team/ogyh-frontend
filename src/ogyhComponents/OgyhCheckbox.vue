<template>
  <input
    type="checkbox"
    class="
      appearance-none
      w-3
      h-3
      lg:w-4 lg:h-4
      rounded-sm
      lg:rounded-md
      cursor-pointer
      border border-gray-400
      checked:bg-indigo-700 checked:border-transparent
    "
    :checked="value"
    @input="onCheckboxChange"
  />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCheckboxChange(e) {
      this.$emit('input', e.target.checked)
    }
  }
})
</script>

<style></style>
