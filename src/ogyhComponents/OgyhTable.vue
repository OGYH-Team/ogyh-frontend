<template>
  <div class="overflow-hidden h-full">
    <slot name="table-head" :selectedItemsCount="selectedItemsCount"> </slot>
    <div class="overflow-x-auto h-full">
      <table class="table-auto" id="ogyh-table">
        <thead>
          <tr class="bg-purple-100 text-purple-700">
            <template v-if="haveCheckbox">
              <th class="text-center">
                <ogyh-checkbox @input="toggleSelectAll" />
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
            v-for="(item, itemIndex) in items"
            :key="itemIndex"
            :class="getRowColor(itemIndex)"
            class="font-light text-gray-600"
          >
            <template v-if="haveCheckbox">
              <td class="text-center">
                <ogyh-checkbox v-model="selectedItems[itemIndex].isChecked" />
              </td>
            </template>
            <slot name="table-item" :item="item" :index="itemIndex"></slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import OgyhCheckbox from '@/ogyhComponents/OgyhCheckbox.vue'

export default Vue.extend({
  name: 'OgyhTable',
  components: {
    OgyhCheckbox
  },
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
  watch: {
    selectedItemsCount() {
      const selectedId = this.selectedItems.reduce((acc, item) => {
        if (item.isChecked) {
          return [...acc, item.id]
        }
        return [...acc]
      }, [])
      this.$emit('selected-update', selectedId)
      console.log(selectedId)
    }
  },
  computed: {
    selectedItemsCount() {
      return this.selectedItems.filter((item) => item.isChecked).length
    }
  },
  methods: {
    toggleSelectAll(value) {
      this.selectedItems = this.selectedItems.map((item) => ({
        ...item,
        isChecked: value
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
#ogyh-table {
  min-width: 900px;
  width: 100%;
}

@layer components {
  #ogyh-table td,
  #ogyh-table th {
    @apply p-2 px-3 text-sm lg:p-3 lg:px-4 lg:text-base;
  }
}
</style>
