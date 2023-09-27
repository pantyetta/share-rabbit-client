<template>
  <div
    class="absolute top-0 left-0 h-3 w-full text-[.25rem] flex items-center justify-center"
    :class="barColor()"
    @click="onClick()"
  >
    <span v-show="!barStatus" class="tracking-widest text-[#fff]"
      >disconnected.</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "HeaderStatus",
  setup() {
    const barStatus = ref(false);

    const barColor = () => {
      return barStatus.value ? "bg-[#86DEC2]" : "bg-[#FF6363]";
    };

    const onClick = () => {
      barStatus.value = !barStatus.value;
    };

    return {
      barColor,
      barStatus,
      onClick,
    };
  },
});
</script>
