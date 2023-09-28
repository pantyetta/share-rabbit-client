<template>
  <div class="flex flex-col gap-2">
    <PostCard v-for="data in customData" :key="data.id" :post="data"></PostCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PostCard from "@/components/PostCard.vue";

export default defineComponent({
  name: "mainPage",
  components: {
    PostCard,
  },
  setup() {
    const customData = ref([
      {
        id: "eeee",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "eeee",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "eeee",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "eeee",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "bddd",
        url: "https://www.youtube.com/watch?v=TD-LX0Y5Z6E",
        time: "09/16 12:01",
      },
      { id: "cc", url: "https://google.com", time: "09/15 15:20" },
      { id: "bbb", url: "https://youtube.com", time: "09/14 06:52" },
      { id: "a", url: "https://google.com", time: "09/12 15:20" },
    ]);

    return {
      customData,
    };
  },
});
</script>
