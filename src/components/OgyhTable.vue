<template>
  <table class="table-auto w-full">
    <thead>
      <tr class="bg-purple-100 text-purple-700">
        <template v-if="haveCheckbox">
          <th class="p-3 px-4 text-center">
            <input type="checkbox" @input="toggleSelectAll" />
          </th>
        </template>
        <th
          v-for="(header, headerIndex) in headers"
          :key="headerIndex"
          class="text-left p-3 px-4"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, itemIndex) in items"
        :key="itemIndex"
        :class="itemIndex % 2 != 0 ? 'bg-purple-50' : ''"
      >
        <template v-if="haveCheckbox && checkboxes.length">
          <td class="p-3 px-4 text-center">
            <input
              type="checkbox"
              @input="onCheckboxChecked"
              v-model="checkboxes[itemIndex].isChecked"
            />
          </td>
        </template>
        <slot name="tableItem" :item="item"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'OgyhTable',
  props: {
    items: {
      type: Array,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    haveCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkboxes: []
    }
  },
  methods: {
    toggleSelectAll(e) {
      this.checkboxes = this.checkboxes.map((checkbox) => ({
        ...checkbox,
        isChecked: e.target.checked
      }))
    },
    onCheckboxChecked(e) {
      console.log(e.target.checked)
    }
  },
  mounted() {
    this.items.forEach((_, index) => {
      this.checkboxes.push({ isChecked: false, id: index })
    })
  }
})
</script>

<style></style>
