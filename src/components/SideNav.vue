<template>
  <nav class="w-1/5 h-screen bg-white shadow-2xl flex flex-col z-10">
    <div class="h-20 flex items-center justify-center">
      <router-link to="/" class="uppercase font-bold text-3xl cursor-pointer">
        <span class="text-green-300">og</span>
        <span class="text-purple-700">yh</span>
      </router-link>
    </div>
    <div v-for="(item, itemIndex) in navItems" :key="itemIndex">
      <router-link
        :to="item.link"
        class="p-4 flex text-gray-400 hover:text-purple-700 items-center"
        active-class="bg-purple-100 text-purple-700"
      >
        <span class="w-10 flex items-center justify-center">
          <font-awesome-icon :icon="item.icon" />
        </span>
        <span class="ml-2 flex-grow">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SideNav',
  data: () => ({
    navItems: [
      { label: 'Queue', link: '/queue', icon: 'people-arrows' },
      { label: 'Sites', link: '/sites', icon: 'building' }
    ]
  })
})
</script>

<style></style>
