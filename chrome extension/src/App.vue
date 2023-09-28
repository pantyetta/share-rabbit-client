<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import { useSettings } from "@/stores/settings";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
  },
  setup() {
    const setting = useSettings();

    watch(
      () => setting.darkMode,
      (value) => {
        const $html = document.querySelector("html");
        if ($html == null) return;
        $html.dataset.theme = value ? "dark-rabbit" : "white-rabbit";
      }
    );

    return {
      setting,
    };
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
