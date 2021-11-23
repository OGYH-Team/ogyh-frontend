<template>
  <div class="max-w-sm mx-auto flex flex-col items-center justify-center pt-8">
    <ogyh-text-field
      type="text"
      class="my-2"
      name="username"
      placeholder="Username"
    />
    <ogyh-text-field
      type="password"
      class="my-2"
      name="password"
      placeholder="Password"
    />
    <button class="btn btn-accent my-2">Sign-in</button>
  </div>
</template>

<script>
import Vue from 'vue'
import OgyhTextField from '@/ogyhComponents/OgyhTextField.vue'

export default Vue.extend({
  name: 'Account',
  components: {
    OgyhTextField
  },
  props: {
    isSignIn: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style></style>
