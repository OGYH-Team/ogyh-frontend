<template>
  <div id="app" class="flex flex-row">
    <side-nav />
    <div class="flex flex-col w-full">
      <navbar />
      <page-content>
        <router-view></router-view>
      </page-content>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SideNav from '@/components/SideNav.vue'
import PageContent from '@/components/PageContent.vue'
import Navbar from './components/Navbar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    SideNav,
    PageContent,
    Navbar
  }
})
</script>

<style lang="scss"></style>
