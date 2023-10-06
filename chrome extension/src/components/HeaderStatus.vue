<template>
  <div
    class="absolute top-0 left-0 h-3 w-full text-[.25rem] flex items-center justify-center cursor-pointer"
    :class="isStatus ? 'bg-success' : 'bg-error'"
    @click="onClick()"
  >
    <div
      v-show="!isStatus"
      class="tracking-widest text-[.5rem] flex gap-1 items-center text-[#fdfdfd]"
    >
      <span>Reload Connection. Click Me</span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        class="fill-[#fdfdfd]"
      >
        <path
          d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "HeaderStatus",
  setup() {
    const isStatus = ref(false);

    chrome.runtime.sendMessage("get-init-status", (response) => {
      isStatus.value = response;
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "update-status") {
        isStatus.value = message.value;
      }
    });

    const onClick = () => {
      isStatus.value
        ? chrome.runtime.sendMessage("ws-close")
        : chrome.runtime.sendMessage("ws-open");
    };

    return {
      onClick,
      isStatus,
    };
  },
});
</script>
