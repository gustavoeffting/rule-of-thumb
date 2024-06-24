import { defineStore } from "pinia";
import { data } from '../assets/data.json';

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data
  }),
  actions: {
    updateVoting(name, vote) {
      const index = this.data.findIndex((item) => item.name === name);

      if (vote === true) {
        this.data[index].votes.positive++;
      } else {
        this.data[index].votes.negative--;
      }
    }
  }
})