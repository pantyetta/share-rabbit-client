import { defineStore } from "pinia";

interface historyProp {
  id: string;
  url: string;
}

const isExtension = location.href.match("^chrome-extension://.+")?.length == 1;

export const useHistory = defineStore("history", {
  state: () => ({
    history: [] as historyProp[],
  }),
  actions: {
    add(id: string, url: string) {
      this.history.unshift({ id, url });
    },
    remove(id: string) {
      this.history = this.history.filter((item) => {
        return item.id != id;
      });
    },
    testAdd() {
      const key = Math.random().toString(32).substring(2);
      const time = new Date().getTime();
      this.add(`0:testUser:${time}`, `https://example.org/${key}`);
    },
    async save() {
      isExtension
        ? await chrome.storage.local.set({
            ["historys"]: this.history,
          })
        : localStorage.setItem("historys", JSON.stringify(this.history));
    },
    async init(template?: historyProp[]) {
      if (template) {
        this.history = template;
        return;
      }
      const historys = isExtension
        ? Object.values(
            ((await chrome.storage.local.get("historys"))[
              "historys"
            ] as historyProp[]) || {}
          )
        : (JSON.parse(
            localStorage.getItem("historys") || "[]"
          ) as historyProp[]);
      if (!historys || historys.length == 0) return;
      this.history = historys;
    },
  },
});
