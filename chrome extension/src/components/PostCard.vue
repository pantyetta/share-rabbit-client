<template>
  <a
    class="join join-vertical w-full p-5 border-[#DDDDDD] border drop-shadow-sm group hover:border-accent focus-visible:border-accent"
    :href="post.url"
    target="_blank"
    @mouseover="onOver()"
    @mouseleave="onleave()"
  >
    <dvi class="flex items-center text-[#888888] text-sm">
      <img class="w-4 h-auto" :src="getFavicon(post.url)" />
      <p class="ml-2">{{ post.time }}</p>
    </dvi>
    <p
      class="text-lg max-h-14 text-ellipsis overflow-hidden group-hover:underline group-focus-visible:underline"
    >
      {{ post.url }}
    </p>
    <button
      v-show="ishover"
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
      @click.prevent="history.remove(post.id)"
    >
      ✕
    </button>
  </a>
</template>

<script lang="ts">
import { useHistory } from "@/stores/history";
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "PostCard",
  props: {
    post: Object,
  },
  setup() {
    const history = useHistory();

    const getFavicon = (url: string) => {
      return `https://www.google.com/s2/favicons?domain=${url}`;
    };

    const getTime = () => {
      const date = new Date();
      const [month, day, hour, minutes] = [
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ];

      return `${month}/${day} ${hour}:${minutes}`;
    };

    const ishover = ref(false);

    const onOver = () => {
      ishover.value = true;
    };

    const onleave = () => {
      ishover.value = false;
    };

    return {
      getTime,
      getFavicon,
      onOver,
      onleave,
      ishover,
      history,
    };
  },
});
</script>

<style></style>
