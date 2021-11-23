<template>
  <div id="app">
    <loader :is-loading="$wait.is('loading')" />
    <side-nav />
    <overlay :is-show="isSideNavOpen" />
    <div class="body h-screen overflow-hidden">
      <navbar />
      <page-content>
        <router-view></router-view>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import SideNav from '@/components/SideNav.vue'
import PageContent from '@/components/PageContent.vue'
import Navbar from '@/components/Navbar.vue'
import Overlay from '@/components/Overlay.vue'
import Loader from '@/components/Loader.vue'

export default Vue.extend({
  name: 'App',
  components: {
    SideNav,
    PageContent,
    Navbar,
    Loader,
    Overlay
  },
  computed: {
    ...mapState('app', ['isSideNavOpen'])
  }
})
</script>

<style>
@layer components {
  #app {
    @apply flex flex-row min-h-screen;
  }

  .body {
    @apply flex flex-col w-full;
  }
}
</style>
