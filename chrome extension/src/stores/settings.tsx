import { defineStore } from "pinia";

interface SETTINGSTYPE {
  uid: string;
  url: string;
  darkmode?: boolean;
}

const isExtension = location.href.match("^chrome-extension://.+")?.length == 1;

export const useSettings = defineStore("settings", {
  state: () => ({
    uid: "",
    url: "wss://rabbit.pantyetta.com",
    darkMode: matchMedia("(prefers-color-scheme: dark)").matches,
  }),
  actions: {
    async save() {
      isExtension
        ? await chrome.storage.local.set({
            ["settings"]: {
              uid: this.uid,
              url: this.url,
              darkmode: this.darkMode,
            },
          })
        : localStorage.setItem(
            "settings",
            JSON.stringify({
              uid: this.uid,
              url: this.url,
              darkmode: this.darkMode,
            })
          );
    },
    async init() {
      const settings = isExtension
        ? ((await chrome.storage.local.get("settings"))[
            "settings"
          ] as SETTINGSTYPE)
        : (JSON.parse(
            localStorage.getItem("settings") || "{}"
          ) as SETTINGSTYPE);
      if (!settings || !Object.keys(settings).length) return;
      this.uid = settings.uid;
      this.url = settings.url;
      if (settings.darkmode !== undefined) this.darkMode = settings.darkmode;

      const $html = document.querySelector("html");
      if ($html == null) return;
      $html.dataset.theme = this.darkMode ? "dark-rabbit" : "white-rabbit";
    },
    reset() {
      this.$reset();
      this.save();
    },
  },
});
