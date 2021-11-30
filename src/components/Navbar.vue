<template>
  <header class="w-full">
    <nav class="navbar">
      <h3 class="text-xl font-semibold">
        <font-awesome-icon
          icon="bars"
          size="lg"
          class="cursor-pointer mr-4 lg:hidden"
          @click="toggleSideNav"
        />
        {{ navTitle }}
      </h3>
      <p
        v-if="isAuth"
        class="cursor-pointer font-extrabold flex items-center gap-2"
        @click="onSignOut"
      >
        <font-awesome-icon icon="sign-out-alt" />
        <span>Sign-out</span>
      </p>
    </nav>
  </header>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import axios from '@/httpClient'

export default Vue.extend({
  name: 'Navbar',
  computed: {
    ...mapState('app', ['navTitle', 'isAuth'])
  },
  methods: {
    ...mapMutations('app', {
      toggleSideNav: 'toggleSideNav'
    }),
    onSignOut() {
      axios.defaults.headers.common.Authorization = null
      localStorage.removeItem('accessToken')
      this.$store.commit('app/setAuthStatus', false)
      this.$router.push('/sign-in')
    }
  }
})
</script>

<style>
@layer components {
  .navbar {
    @apply bg-white h-20 flex items-center px-6 shadow-lg text-purple-700 justify-between;
  }
}
</style>
