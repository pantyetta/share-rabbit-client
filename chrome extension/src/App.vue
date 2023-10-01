<template>
  <CustomHeader></CustomHeader>
  <router-view class="overflow-y-auto p-5 relative top-16 h-[386px]" />
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import CustomHeader from "./components/CustomHeader.vue";
import { useSettings } from "@/stores/settings";
import { useHistory } from "./stores/history";

export default defineComponent({
  name: "App",
  components: {
    CustomHeader,
  },
  setup() {
    const setting = useSettings();
    const history = useHistory();

    watch(
      () => setting.darkMode,
      (value) => {
        const $html = document.querySelector("html");
        if ($html == null) return;
        $html.dataset.theme = value ? "dark-rabbit" : "white-rabbit";
      }
    );

    const isSysDark = matchMedia("(prefers-color-scheme: dark)").matches;
    if (isSysDark) setting.darkMode = true;

    const data = [
      {
        id: "hhh",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "ggg",
        url: "https://www.amazon.co.jp/gp/buyagain/ref=pd_gwd_bag_pd_gw_rp_2?ie=UTF8&ats=eyJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDA0T1E1U0dDIiwiY3VzdG9tZXJJZCI6IkFJTFdHMEE2Q01UN1UifQ%3D%3D&pd_rd_w=YeC5S&content-id=amzn1.sym.013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_p=013262cb-6006-4f58-84bc-7f4eec8e9500&pf_rd_r=0JFY24JVTHQ89VC5148T&pd_rd_wg=Hltp3&pd_rd_r=caa7a710-cbae-47f2-9fc3-b86041e0f3ff",
        time: "09/02 16:49",
      },
      {
        id: "fff",
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
    ];

    data.forEach((d) => {
      history.add(d.id, d.url, d.time);
    });

    return {
      setting,
      isSysDark,
    };
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
