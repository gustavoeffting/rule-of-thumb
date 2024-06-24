import { defineStore } from "pinia";
import { data } from '../assets/data.json';

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data: JSON.parse(localStorage.getItem("data")) || data
  }),
  actions: {
    updateVoting(name, vote) {
      // TODO: update lastUpdated
      const index = this.data.findIndex((item) => item.name === name);

      if (vote === true) {
        this.data[index].votes.positive++;
      } else {
        this.data[index].votes.negative++;
      }

      localStorage.setItem("data", JSON.stringify(this.data));
    },
  }
})