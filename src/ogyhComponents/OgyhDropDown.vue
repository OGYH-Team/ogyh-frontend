<template>
  <div class="relative">
    <button class="btn btn-accent" @click="toggleDropdown" ref="dropdown">
      {{ placeholder }}
      <font-awesome-icon icon="caret-down" class="ml-2" />
    </button>
    <ul
      class="
        flex flex-col
        bg-white
        shadow-md
        absolute
        left-0
        -bottom-2
        transform
        translate-y-full
      "
      v-if="isDropdownOpen"
    >
      <li
        class="px-2 py-3 cursor-pointer hover:bg-gray-100 select-none"
        v-for="(menu, menuItem) in menus"
        :key="menuItem"
        @click="() => onMenuItemSelect(menu)"
      >
        <slot name="menu-item" :menuItem="menu"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhDropDown',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select items...'
    }
  },
  data() {
    return {
      isDropdownOpen: false
    }
  },
  methods: {
    onMenuItemSelect(menu) {
      this.isDropdownOpen = false
      this.$emit('item-selected', menu)
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.isDropdownOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  }
})
</script>

<style></style>
