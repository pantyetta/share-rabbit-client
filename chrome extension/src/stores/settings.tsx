import { defineStore } from "pinia";

export const useSettings = defineStore("settings", {
  state: () => ({
    uid: "",
    url: "",
    darkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});
