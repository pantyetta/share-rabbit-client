<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomHeader from "./components/CustomHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
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
