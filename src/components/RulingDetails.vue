<template>
  <div class="ruling-details" :style="{ backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 60%, gray 100%), url(${picture})` }">
    <div class="ruling-info">
      <button v-if="decision==='positive'" class="icon-button vote-result-info" aria-label="thumbs up">
        <ThumbsUp alt="thumbs up"/>
      </button>
      <button v-else class="icon-button vote-result-info" aria-label="thumbs down">
        <ThumbsDown alt="thumbs down" />
      </button>
      <div class="ruling-info-details">
        <p class="ruling-name">{{ props.ruling.name }}</p>
        <p class="ruling-description">{{ props.ruling.description }}</p>
      </div>
      <div class="ruling-info-buttons">
        <p class="ruling-date">{{ hasVoted ? 'Thank you for your vote!' : `${lastUpdated} ago in ${props.ruling.category}` }}</p>
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
    <div class="vote-percentage">
      <div class="vote-percentage-positive" :style="{ width: averagePositive + '%' }">
        <ThumbsUp alt="thumbs up"/>
        <span>{{ averagePositive }}%</span>
      </div>
      <div class="vote-percentage-negative" :style="{ width: averageNegative + '%' }">
        <span>{{ averageNegative }}%</span>
        <ThumbsDown alt="thumbs down" />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps(['ruling', 'picture']);
import ThumbsUp from '../assets/img/thumbs-up.svg?component';
import ThumbsDown from '../assets/img/thumbs-down.svg?component';

import { DateTime } from 'luxon';

import { ref, computed } from 'vue';
import { useDataStore } from '../stores/dataStore';

const dataStore = useDataStore();

const updateVoting = (name, vote) => dataStore.updateVoting(name, vote);

const vote = ref(null);
const hasVoted = ref(false);

const handleVote = () => {
  if (hasVoted.value) {
    hasVoted.value = false;
    vote.value = null;
  } else {
    updateVoting(props.ruling.name, vote.value);
    hasVoted.value = true;
  }
}

const averagePositive = computed(() => Math.round(props.ruling.votes.positive / (props.ruling.votes.positive + props.ruling.votes.negative) * 100));
const averageNegative = computed(() => Math.round(props.ruling.votes.negative / (props.ruling.votes.positive + props.ruling.votes.negative) * 100));
const decision = computed(() => averagePositive.value > averageNegative.value ? 'positive' : 'negative');

const lastUpdated = computed(() => DateTime.fromISO(props.ruling.lastUpdated).setLocale('en').toRelative());
</script>
<style scoped>
.ruling-details {
  margin-top: 10px;
  width: 100%;
  max-width: 1100px;
  height: 170px;
  background-color: gray;
  color: white;
  background-size: cover;
  background-position: left;
  background-repeat: no-repeat;
  background-size: 20%;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 20%, gray 100%), url('');
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
  margin-right: 15px;
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

.vote-result-info {
  width: 45px;
  height: 45px;
}

.vote-percentage {
  width: 100%;
  height: 54px;
  display: flex;
  font-size: 20px;
}

.vote-percentage-positive {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  background-color: rgb(60, 187, 180, 0.6);
  height: 54px;
  padding-left: 15px;
}

.vote-percentage-negative {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 5px;
  background-color: rgb(249, 172, 29, 0.6);
  height: 54px;
  padding-right: 15px;
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