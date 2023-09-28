import { defineStore } from "pinia";

export const useSettings = defineStore("settings", {
  state: () => ({
    uid: "",
    url: "",
    darkMode: false,
  }),
});
