<template>
  <input
    v-bind="$attrs"
    class="ogyh-field"
    @input="onTextInputChange"
    :value="value"
    :class="error ? 'border-red-400 focus:ring-0' : 'border-transparent'"
  />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhTextField',
  props: ['value', 'error'],
  methods: {
    onTextInputChange(e) {
      this.$emit('input', e.target.value)
    }
  }
})
</script>

<style></style>
