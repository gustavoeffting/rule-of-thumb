<template>
  <div class="previous-rulings-header">
    <h2>Previous Rulings</h2>
    <span>List (selector)</span>
  </div>
  <div v-for="ruling in previousRulings">
    <RulingDetails :ruling="ruling"/>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import RulingDetails from './RulingDetails.vue';
import { useDataStore } from '../stores/dataStore';

const dataStore = useDataStore();

const previousRulings = computed(() => dataStore.data);
</script>
<style scoped>
.previous-rulings-header {
  display: flex;
  justify-content: space-between;
}

</style>