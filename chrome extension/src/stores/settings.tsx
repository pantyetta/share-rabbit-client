import { defineStore } from "pinia";

interface SETTINGSTYPE {
  uid: string;
  url: string;
  darkmode: boolean;
  isStatus: boolean;
}

const isExtension = location.href.match("^chrome-extension://.+")?.length == 1;

export const useSettings = defineStore("settings", {
  state: () => ({
    uid: "",
    url: "",
    darkMode: matchMedia("(prefers-color-scheme: dark)").matches,
    isStatus: false,
  }),
  actions: {
    save() {
      isExtension
        ? chrome.storage.local.set({
            ["settings"]: {
              uid: this.uid,
              url: this.url,
              darkmode: this.darkMode,
              isStatus: this.isStatus,
            },
          })
        : localStorage.setItem(
            "settings",
            JSON.stringify({
              uid: this.uid,
              url: this.url,
              darkmode: this.darkMode,
              isStatus: this.isStatus,
            })
          );
    },
    async init() {
      const settings = isExtension
        ? ((await chrome.storage.local.get("settings"))[
            "settings"
          ] as SETTINGSTYPE)
        : (JSON.parse(
            localStorage.getItem("settings") ||
              '{ uid: "", url: "", darkmode: false, isStatus: false }'
          ) as SETTINGSTYPE);
      this.uid = settings.uid;
      this.url = settings.url;
      this.darkMode = settings.darkmode;
      this.isStatus = settings.isStatus;
    },
    reset() {
      this.$reset();
      this.save();
    },
  },
});
