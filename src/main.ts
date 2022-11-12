/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SCTG Développement
=========================================================
This website use:
- Vite, Vue3, TailwindCss 3
- And many others
*/
import { createApp } from "vue";
import App from "@/App.vue";
import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import { addJsonLD } from "./config/StructuredLDJson";
import "@/index.scss";

const routes = [
  {
    path: "/",
    component: () => import("@/views/404.vue"),
    name: "index",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "default",
    redirect: "/",
  },
] as RouteRecordRaw[];

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
      };
    }
  },
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
addJsonLD();

