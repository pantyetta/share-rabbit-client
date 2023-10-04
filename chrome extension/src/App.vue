<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import { useSettings } from "@/stores/settings";
import { useHistory } from "./stores/history";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
  },
  setup() {
    const settings = useSettings();
    const history = useHistory();

    const dtemp = [
      {
        id: "10:pancho:1696382088",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
      },
      {
        id: "20:pancho:1696382030",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
      },
      {
        id: "10:pancho:1696380088",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
      },
      {
        id: "10:pancho:1696372088",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
      },
      {
        id: "10:pancho:1698370000",
        url: "https://www.youtube.com/watch?v=TD-LX0Y5Z6E",
      },
      { id: "10:pancho:1692372088", url: "https://google.com" },
      { id: "10:pancho:1696372088", url: "https://youtube.com" },
      { id: "10:pancho:1694372088", url: "https://google.com" },
    ];

    onMounted(async () => {
      await settings.init();
      await history.init();
    });

    watch(
      () => settings.darkMode,
      (value) => {
        const $html = document.querySelector("html");
        if ($html == null) return;
        $html.dataset.theme = value ? "dark-rabbit" : "white-rabbit";
      }
    );

    watch(settings, (settings) => {
      settings.save();
    });

    watch(history, (history) => {
      history.save();
    });
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
