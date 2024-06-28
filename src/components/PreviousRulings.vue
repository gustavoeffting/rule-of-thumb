<template>
  <div class="previous-rulings-header">
    <h2>Previous Rulings</h2>
    <select class="select" v-model="exibitionType">
      <option value="list" selected>List</option>
      <option value="grid">Grid</option>
    </select>
  </div>
  <div :class="{ 'ruling-details-grid': exibitionType === 'grid' }">
    <RulingDetails v-for="ruling in previousRulings" :ruling="ruling" :picture="rulingPicture(ruling.picture)"
      :exibitionType="exibitionType" />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useDataStore } from '../stores/dataStore';
import RulingDetails from './RulingDetails.vue';
import imgKanye from '../assets/img/kanye.png';
import imgCristina from '../assets/img/cristina.png';
import imgElon from '../assets/img/elon.png';
import imgMalala from '../assets/img/malala.png';
import imgMark from '../assets/img/mark.png';
import imgGreta from '../assets/img/greta.png';

const dataStore = useDataStore();

const exibitionType = ref('list');

const rulingPicture = (pictureName) => {
  switch (pictureName) {
    case 'kanye.png':
      return imgKanye;
    case 'cristina.png':
      return imgCristina;
    case 'elon.png':
      return imgElon;
    case 'malala.png':
      return imgMalala;
    case 'mark.png':
      return imgMark;
    case 'greta.png':
      return imgGreta;
  }
}

const previousRulings = computed(() => dataStore.data);
</script>
<style scoped>
.previous-rulings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select {
  padding: 5px 10px;
  width: 173px;
  height: 36px;
}

.ruling-details-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>