import { defineStore } from "pinia";
import { data } from '../assets/data.json';
import { DateTime } from "luxon";

export const useDataStore = defineStore({
  id: "data",
  state: () => ({
    data: JSON.parse(localStorage.getItem("data")) || data
  }),
  actions: {
    updateVoting(name, vote) {
      const index = this.data.findIndex((item) => item.name === name);

      if (vote === true) {
        this.data[index].votes.positive++;
      } else {
        this.data[index].votes.negative++;
      }

      this.data[index].lastUpdated = DateTime.now().toISO();
      localStorage.setItem("data", JSON.stringify(this.data));
    },
  }
})