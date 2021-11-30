<template>
  <nav
    class="
      bg-white
      shadow-2xl
      z-50
      h-screen
      absolute
      w-1/3
      flex flex-col
      transform
      transition-transform
      lg:w-1/5 lg:relative lg:translate-x-0 lg:z-30
    "
    :class="isSideNavOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="h-20 flex items-center justify-center">
      <router-link to="/" class="uppercase font-bold text-3xl cursor-pointer">
        <font-awesome-icon
          icon="smile-wink"
          size="lg"
          class="mr-3 text-indigo-600"
        />
        <span class="text-green-300">og</span>
        <span class="text-purple-700">yh</span>
      </router-link>
    </div>
    <div v-for="(item, itemIndex) in navItems" :key="itemIndex">
      <router-link
        :to="item.link"
        class="nav-item"
        active-class="bg-purple-100 text-purple-700 font-semibold"
      >
        <span class="w-10 flex items-center justify-center">
          <font-awesome-icon :icon="item.icon" />
        </span>
        <span class="ml-2 flex-grow">{{ item.label }}</span>
      </router-link>
    </div>
    <router-link
      v-if="!isAuth"
      to="/sign-in"
      class="nav-item"
      active-class="bg-purple-100 text-purple-700 font-semibold"
    >
      <span class="w-10 flex items-center justify-center">
        <font-awesome-icon icon="sign-in-alt" />
      </span>
      <span class="ml-2 flex-grow">Sign-in</span>
    </router-link>
  </nav>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import axios from '@/httpClient'

export default Vue.extend({
  name: 'SideNav',
  data() {
    return {
      navItems: [
        { label: 'Queue', link: '/queue', icon: 'people-arrows' },
        { label: 'Sites', link: '/sites', icon: 'building' }
      ]
    }
  },
  computed: {
    ...mapState('app', ['isSideNavOpen', 'isAuth'])
  }
})
</script>

<style>
@layer components {
  .nav-item {
    @apply p-4 flex text-gray-400 hover:text-purple-700 items-center cursor-pointer;
  }
}
</style>
