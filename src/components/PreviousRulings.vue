<template>
  <div class="previous-rulings-header">
    <h2>Previous Rulings</h2>
    <span>List (selector)</span>
  </div>
  <div v-for="ruling in previousRulings">
    <RulingDetails :ruling="ruling" :picture="rulingPicture(ruling.picture)"/>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import RulingDetails from './RulingDetails.vue';
import { useDataStore } from '../stores/dataStore';
import imgKanye from '../assets/img/kanye.png';
import imgCristina from '../assets/img/cristina.png';
import imgElon from '../assets/img/elon.png';
import imgMalala from '../assets/img/malala.png';
import imgMark from '../assets/img/mark.png';
import imgGreta from '../assets/img/greta.png';

const dataStore = useDataStore();

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
}

</style>