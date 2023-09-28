import { defineStore } from "pinia";

export const useStoreCounter = defineStore("counter", {
  state: () => ({
    count: 10,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});
