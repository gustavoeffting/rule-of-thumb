<template>
  <div class="ruling-details">
    <div class="ruling-info">
      <div class="ruling-info-details">
        <p class="ruling-name">{{ props.ruling.name }}</p>
        <p class="ruling-description">{{ props.ruling.description }}</p>
      </div>
      <div class="ruling-info-buttons">
        <p class="ruling-date">{{ hasVoted ? 'Thank you for you vote!' : `${props.ruling.lastUpdated} ago in ${category}` }}</p>
        <div class="button-options">
          <div v-if="!hasVoted">
            <button class="icon-button btn-option" :class="{ 'btn-vote-selected': vote === true }" @click="vote = true" aria-label="thumbs up">
              <ThumbsUp alt="thumbs up"/>
            </button>
            <button class="icon-button btn-option" :class="{ 'btn-vote-selected': vote === false }" @click="vote = false" aria-label="thumbs down">
              <ThumbsDown alt="thumbs down" />
            </button>
          </div>
          <button class="btn-vote" :class="{ 'btn-disabled': vote === null }" :disabled="vote === null" @click="handleVote()">
            {{ hasVoted ? 'Vote Again' : 'Vote now' }}
          </button>
        </div>
      </div>
    </div>
    <div class="vote-percentage"></div>
  </div>
</template>
<script setup>
const props = defineProps(['ruling']);
import ThumbsUp from '../assets/img/thumbs-up.svg?component';
import ThumbsDown from '../assets/img/thumbs-down.svg?component';

import { ref } from 'vue';

const vote = ref(null);
const hasVoted = ref(false);

const handleVote = () => {
  if (hasVoted.value) {
    hasVoted.value = false;
    vote.value = null;
  } else {
    // TODO: implement vote logic and add to data.json
    // vote.value
    hasVoted.value = true;
  }
}
</script>
<style scoped>
.ruling-details {
  margin-top: 10px;
  width: 100%;
  max-width: 1100px;
  height: 170px;
  background-color: gray;
  color: white;
}

.ruling-info {
  display: flex;
  height: 116px;
}

.ruling-info-details {
  width: 55%;
  margin-left: 200px;
}

.ruling-info-buttons {
  width: 25%;
}

.ruling-name {
  font-size: 24px;
}

.ruling-date {
  font-size: 12px;
  text-align: end;
}

.ruling-description {
  font-size: 14px;
}

.vote-percentage {
  width: 100%;
  height: 54px;
  background-color: aqua;
  opacity: 0.3;
}

.button-options {
  display: flex;
  justify-content: end;
  align-items: center;
}

.btn-vote {
  width: 135px;
  height: 45px;
  background-color: rgb(0, 0, 0, .5);
  color: white;
  border: 1px solid white;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
}

.btn-disabled {
  background-color: rgb(0, 0, 0, .3);
}

.btn-option {
  width: 45px;
  height: 45px;
  margin-left: 5px;
  cursor: pointer;
}

.btn-vote-selected {
  border: 1px solid white;
}
</style>