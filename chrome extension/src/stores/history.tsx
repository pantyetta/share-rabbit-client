import { defineStore } from "pinia";

interface historyProp {
  id: string;
  url: string;
  time: string;
}

export const useHistory = defineStore("history", {
  state: () => ({
    history: [] as historyProp[],
  }),
  actions: {
    add(id: string, url: string, time: string) {
      this.history.push({ id, url, time });
    },
    remove(id: string) {
      this.history = this.history.filter((item) => {
        return item.id != id;
      });
    },
    testAdd() {
      const key = Math.random().toString(32).substring(2);
      this.add(key, `https://example.org/${key}`, Date().toString());
    },
  },
});
