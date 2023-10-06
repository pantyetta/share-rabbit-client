import { defineStore } from "pinia";

interface historyProp {
  id: string;
  url: string;
}

const isExtension = location.href.match("^chrome-extension://.+")?.length == 1;

export const useHistory = defineStore("historys", {
  state: () => ({
    historys: [] as historyProp[],
  }),
  actions: {
    add(id: string, url: string) {
      this.historys.unshift({ id, url });
    },
    remove(id: string) {
      this.historys = this.historys.filter((item) => {
        return item.id != id;
      });
    },
    testAdd() {
      const key = Math.random().toString(32).substring(2);
      const time = new Date().getTime().toString() + "000000";
      this.add(`0:testUser:${time}`, `https://example.org/${key}`);
    },
    async save() {
      isExtension
        ? await chrome.storage.local.set({
            ["historys"]: this.historys,
          })
        : localStorage.setItem("historys", JSON.stringify(this.historys));
    },
    async init(template?: historyProp[]) {
      if (template) {
        this.historys = template;
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
      this.historys = historys;
    },
  },
});
