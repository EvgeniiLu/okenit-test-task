import { createRouter, createWebHistory } from "vue-router";
import UsersPosts from "../views/UsersPosts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: UsersPosts,
    props: true,
  },
  {
    path: "/info/:id",
    name: "info",
    component: () => import("../views/PostInfo.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
