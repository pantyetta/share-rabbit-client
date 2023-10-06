<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import { useSettings } from "@/stores/settings";
import { useHistory } from "./stores/historys";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
  },
  setup() {
    const setting = useSettings();
    const history = useHistory();

    const dtemp = [
      { id: "10:pancho:1692372088", url: "https://google.com" },
      { id: "10:pancho:1696372088", url: "https://youtube.com" },
      { id: "10:pancho:1694372088", url: "https://google.com" },
    ];

    onMounted(async () => {
      await setting.init();
      await history.init();
      await chrome.runtime.sendMessage("get-historys-update");
    });

    watch(
      () => setting.darkMode,
      (value) => {
        const $html = document.querySelector("html");
        if ($html == null) return;
        $html.dataset.theme = value ? "dark-rabbit" : "white-rabbit";
      }
    );

    watch(setting, async (setting) => {
      await setting.save();
    });

    watch(history, async (history) => {
      await history.save();
    });

    chrome.runtime.onMessage.addListener(async (message) => {
      if (message.type === "update-historys") {
        await history.init();
      }
    });
  },
});
</script>

<style>
#app {
  width: 350px;
  height: 450px;
  position: relative;
  overflow: hidden;
}
</style>
./stores/historys
