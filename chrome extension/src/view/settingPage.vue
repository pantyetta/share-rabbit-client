<template>
  <div class="">
    <a href="#" @click="goBack()" class="inline-block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        :class="setting.darkMode ? 'fill-[#c1c1c1]' : 'fill-[#3a3a3a]'"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
        />
      </svg>
    </a>
    <h1 class="mt-4 text-neutral-400 uppercase">setting</h1>
    <div class="flex flex-col items-start gap-4 relative">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold">UID</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          v-model="setting.uid"
          @blur="changeUid()"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold">URL</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          v-model="setting.url"
          @blur="changeUrl()"
        />
      </div>
      <div>
        <p class="pb-2 pt-2 font-bold">DarkMode</p>
        <input type="checkbox" class="toggle" v-model="setting.darkMode" />
      </div>
      <div class="pb-2 pt-2">
        <button class="btn btn-warning" @click="isModal = true">Reset</button>
        <ErrModal
          v-show="isModal"
          @click-submit="reset()"
          @on-cancel="cancel()"
        />
      </div>
      <div
        class="relative w-[calc(100%+2.5rem)] border-t border-t-[#DDDDDD] left-[-1.25rem]"
      ></div>
    </div>
    <div class="flex flex-col items-start gap-4 relative">
      <h1 class="mt-4 text-neutral-400 uppercase">debug</h1>
      <div>
        <p class="pb-2 pt-2 font-bold">dummy post</p>
        <button class="btn" @click="history.testAdd()">run</button>
      </div>
      <div>
        <p class="pb-2 pt-2 font-bold">Get</p>
        <button class="btn" @click="debugGet()">run</button>
      </div>
      <div>
        <p class="pb-2 pt-2 font-bold">console out historys</p>
        <button class="btn" @click="debugConsoleOut()">run</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useSettings } from "@/stores/settings";
import { useHistory } from "@/stores/historys";
import ErrModal from "@/components/ErrModal.vue";

export default defineComponent({
  name: "settingPage",
  components: {
    ErrModal,
  },
  setup() {
    const router = useRouter();
    const setting = useSettings();
    const history = useHistory();

    const isModal = ref(false);

    const goBack = () => {
      router.back();
    };

    const reset = () => {
      isModal.value = false;
      setting.$reset();
      history.$reset();
      chrome.runtime.sendMessage("ws-open");
    };

    const cancel = () => {
      isModal.value = false;
    };

    const changeUid = () => {
      chrome.runtime.sendMessage("update-uid");
    };

    const changeUrl = () => {
      chrome.runtime.sendMessage("update-url");
    };

    const debugGet = () => {
      chrome.runtime.sendMessage("get-historys-update");
    };

    const debugConsoleOut = () => {
      console.log(history.historys);
    };

    return {
      goBack,
      setting,
      history,
      isModal,
      reset,
      cancel,
      changeUid,
      changeUrl,
      debugGet,
      debugConsoleOut,
    };
  },
});
</script>
@/stores/historys
