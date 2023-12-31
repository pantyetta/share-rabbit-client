import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";

import Home from "./view/mainPage.vue";
import Setting from "./view/settingPage.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/Setting",
    component: Setting,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");

router.replace("/");
