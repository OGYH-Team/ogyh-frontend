<template>
  <div class="relative">
    <button
      class="btn btn-accent flex justify-between items-center"
      @click="toggleDropdown"
      ref="dropdown"
      type="button"
      :class="[
        inputStyle ? 'ogyh-field bg-white text-gray-400' : '',
        error
          ? 'border-red-400 focus:ring-0'
          : 'focus:ring-2 focus:ring-purple-600'
      ]"
    >
      <span :class="haveSelected ? 'text-black' : ''">{{ placeholder }}</span>
      <font-awesome-icon icon="caret-down" class="ml-2" />
    </button>
    <ul
      class="
        flex flex-col
        w-60
        bg-white
        shadow-md
        absolute
        rounded-md
        left-0
        max-h-60
        overflow-y-auto
        -bottom-2
        transform
        translate-y-full
        z-10
      "
      v-if="isDropdownOpen"
    >
      <template v-if="!menus.length">
        <li class="px-2 py-3 text-gray-400 select-none truncate flex-none">
          <p>...</p>
        </li>
      </template>
      <template v-else>
        <li
          class="
            px-2
            py-3
            cursor-pointer
            hover:bg-gray-100
            select-none
            truncate
            flex-none
          "
          v-for="(menu, menuItem) in menus"
          :key="menuItem"
          @click="() => onMenuItemSelect(menu)"
        >
          <slot name="menu-item" :menuItem="menu"></slot>
        </li>
      </template>
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
    },
    inputStyle: {
      type: Boolean,
      default: false
    },
    haveSelected: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
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
