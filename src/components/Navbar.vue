<template>
  <header class="w-full">
    <nav
      class="
        bg-white
        h-20
        flex
        items-center
        justify-between
        px-6
        shadow-lg
        text-purple-700
      "
    >
      <h3 class="text-xl font-semibold">{{ navTitle }}</h3>
      <!-- <ul class="list-none flex">
        <li>
          <a href="#" class="mr-4 hover:text-gray-200 transition-colors"
            >Dashboard
          </a>
        </li>
        <li><a href="#">Sites</a></li>
      </ul> -->
    </nav>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Navbar',
  computed: {
    ...mapState('appModule', ['navTitle'])
  }
})
</script>

<style></style>
