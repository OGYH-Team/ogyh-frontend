<template>
  <div id="page-content" class="flex-grow">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'PageContent'
})
</script>

<style></style>
