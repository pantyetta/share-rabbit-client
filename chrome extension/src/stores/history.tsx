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
  },
});
