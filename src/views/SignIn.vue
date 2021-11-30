<template>
  <form
    class="max-w-xs mx-auto flex flex-col pt-8"
    @submit.prevent="onSubmitSignInForm"
  >
    <h1 class="text-center font-extrabold text-xl text-purple-700">Sign-in</h1>
    <label for="username" class="font-semibold mt-3">Username</label>
    <ogyh-text-field
      type="text"
      class="mt-2"
      name="username"
      placeholder="Enter Username..."
      v-model="signInForm.username"
      :error="signInForm.errors.username"
      @input="() => clearError('username')"
    />
    <span v-if="signInForm.errors.username" class="error-message">{{
      signInForm.errors.username
    }}</span>
    <label for="password" class="font-semibold mt-3">Password</label>
    <ogyh-text-field
      type="password"
      class="mt-2"
      name="password"
      placeholder="Enter Password..."
      v-model="signInForm.password"
      :error="signInForm.errors.password"
      @input="() => clearError('password')"
    />
    <span v-if="signInForm.errors.password" class="error-message">{{
      signInForm.errors.password
    }}</span>
    <button class="btn btn-accent mt-4 block" type="submit">Submit</button>
  </form>
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import OgyhTextField from '@/ogyhComponents/OgyhTextField.vue'

export default Vue.extend({
  name: 'SignIn',
  components: {
    OgyhTextField
  },
  data() {
    return {
      signInForm: {
        username: '',
        password: '',
        errors: {
          username: '',
          password: ''
        }
      }
    }
  },
  methods: {
    ...mapActions('app', {
      signIn: 'signIn'
    }),
    ...mapWaitingActions('app', {
      signIn: 'loading'
    }),
    clearError(field) {
      delete this.signInForm.errors[field]
    },
    async onSubmitSignInForm() {
      if (!(this.signInForm.username && this.signInForm.password)) {
        this.signInForm.errors = {
          username: !this.signInForm.username
            ? 'Username field is missing'
            : '',
          password: !this.signInForm.password ? 'Password field is missing' : ''
        }
        return
      }
      try {
        await this.signIn({
          username: this.signInForm.username,
          password: this.signInForm.password
        })
        this.$router.push('/')
      } catch (e) {
        console.error(e)
      }
    }
  }
})
</script>

<style></style>
