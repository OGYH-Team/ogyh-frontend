<template>
  <div>
    <p>Hello</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Account',
  props: {
    isSignIn: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style></style>
