<template>
  <div class="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
      @click="goBack()"
    >
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
      />
    </svg>
    <h1 class="mt-4 text-neutral-400 uppercase">setting</h1>
    <div class="flex flex-col items-start gap-4">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold">UID</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          v-model="setting.uid"
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text font-bold">UID</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          v-model="setting.url"
        />
      </div>
      <button class="btn btn-warning">Reset</button>
      <div
        class="relative w-[100vw] border-t border-t-[#DDDDDD] left-[-1.25rem]"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "settingPage",
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.back();
    };

    const setting = ref({ uid: "uid default", url: "url default" });

    return {
      goBack,
      setting,
    };
  },
});
</script>
