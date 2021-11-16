<template>
  <header class="w-full">
    <nav class="navbar">
      <font-awesome-icon
        icon="bars"
        size="lg"
        class="cursor-pointer mr-4 lg:hidden md:block"
      />
      <h3 class="text-xl font-semibold">
        {{ navTitle }}
      </h3>
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Navbar',
  computed: {
    ...mapState('app', ['navTitle'])
  }
})
</script>

<style>
@layer components {
  .navbar {
    @apply bg-white h-20 flex items-center px-6 shadow-lg text-purple-700;
  }
}
</style>
