<template>
  <div>
    <div>
      <button
        class="btn btn-sm mb-2 ml-auto flex"
        @click="isModal = true"
        v-show="history.history.length > 1"
      >
        <span>Clear ALl</span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <ErrModal
        v-show="isModal"
        @on-cancel="cancel()"
        @click-submit="reset()"
      />
    </div>
    <div class="flex flex-col gap-2">
      <PostCard
        v-for="data in history.history"
        :key="data.id"
        :post="data"
      ></PostCard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PostCard from "@/components/PostCard.vue";
import { useHistory } from "@/stores/history";
import ErrModal from "@/components/ErrModal.vue";

export default defineComponent({
  name: "mainPage",
  components: {
    PostCard,
    ErrModal,
  },
  setup() {
    const history = useHistory();

    const isModal = ref(false);

    const reset = () => {
      isModal.value = false;
      history.$reset();
    };

    const cancel = () => {
      isModal.value = false;
    };

    return {
      history,
      isModal,
      reset,
      cancel,
    };
  },
});
</script>
