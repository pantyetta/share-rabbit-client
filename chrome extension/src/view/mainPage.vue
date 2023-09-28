<template>
  <div class="flex flex-col gap-2">
    <PostCard
      v-for="data in history.history"
      :key="data.id"
      :post="data"
    ></PostCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PostCard from "@/components/PostCard.vue";
import { useHistory } from "@/stores/history";

export default defineComponent({
  name: "mainPage",
  components: {
    PostCard,
  },
  setup() {
    const history = useHistory();

    return {
      history,
    };
  },
});
</script>
