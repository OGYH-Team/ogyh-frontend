<template>
  <div>
    <slot name="tableHead" :selectedItemsCount="selectedItemsCount"></slot>
    <table class="table-auto w-full" id="ogyh-table">
      <thead>
        <tr class="bg-purple-100 text-purple-700">
          <template v-if="haveCheckbox">
            <th class="text-center">
              <input
                type="checkbox"
                @input="toggleSelectAll"
                class="
                  appearance-none
                  checked:bg-blue-600 checked:border-transparent
                "
              />
            </th>
          </template>
          <th
            v-for="(header, headerIndex) in headers"
            :key="headerIndex"
            class="text-left"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, itemIndex) in items.slice(0, 10)"
          :key="itemIndex"
          :class="getRowColor(itemIndex)"
          class="font-light text-gray-600"
        >
          <template v-if="haveCheckbox">
            <td class="flex items-center justify-center">
              <input
                type="checkbox"
                v-model="selectedItems[itemIndex].isChecked"
                class="
                  appearance-none
                  w-4
                  h-4
                  rounded-md
                  cursor-pointer
                  border border-gray-400
                  checked:bg-indigo-700 checked:border-transparent
                "
              />
            </td>
          </template>
          <slot name="tableItem" :item="item"></slot>
        </tr>
      </tbody>
    </table>
  </div>
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
    itemKey: {
      type: String,
      default: 'id'
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
      selectedItems: []
    }
  },
  computed: {
    selectedItemsCount() {
      return this.selectedItems.filter((item) => item.isChecked).length
    }
  },
  methods: {
    toggleSelectAll(e) {
      this.selectedItems = this.selectedItems.map((item) => ({
        ...item,
        isChecked: e.target.checked
      }))
    },
    getRowColor(index) {
      return index % 2 !== 0 ? 'bg-purple-50' : null
    }
  },
  created() {
    this.items.forEach((item) => {
      this.selectedItems.push({ id: item[this.itemKey], isChecked: false })
    })
  }
})
</script>

<style scoped>
@layer components {
  #ogyh-table td,
  #ogyh-table th {
    @apply p-3 px-4;
  }
}
</style>
