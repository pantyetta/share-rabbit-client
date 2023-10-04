<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import { useSettings } from "@/stores/settings";
import { useHistory } from "./stores/history";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
  },
  setup() {
    const settings = useSettings();
    const history = useHistory();

    const dtemp = [
      { id: "10:pancho:1692372088", url: "https://google.com" },
      { id: "10:pancho:1696372088", url: "https://youtube.com" },
      { id: "10:pancho:1694372088", url: "https://google.com" },
    ];

    onMounted(async () => {
      await settings.init();
      await history.init();
    });

    watch(
      () => settings.darkMode,
      (value) => {
        const $html = document.querySelector("html");
        if ($html == null) return;
        $html.dataset.theme = value ? "dark-rabbit" : "white-rabbit";
      }
    );

    watch(settings, async (settings) => {
      await settings.save();
    });

    watch(history, async (history) => {
      await history.save();
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
