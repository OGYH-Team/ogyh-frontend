<template>
  <input v-bind="$attrs" class="ogyh-field" @input="onTextInputChange" />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhTextField',
  props: ['value'],
  methods: {
    onTextInputChange(e) {
      this.$emit('input', e.target.value)
    }
  }
})
</script>

<style></style>
