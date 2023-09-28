<template>
  <a
    class="join join-vertical w-full p-5 border-[#DDDDDD] border drop-shadow-sm group hover:border-accent focus-visible:border-accent"
    :href="post.url"
    target="_blank"
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
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PostCard",
  props: {
    post: Object,
  },
  setup() {
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

    return {
      getTime,
      getFavicon,
    };
  },
});
</script>

<style></style>
