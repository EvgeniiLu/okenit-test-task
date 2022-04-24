import { createRouter, createWebHistory } from "vue-router";
import UsersView from "../views/UsersView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: UsersView,
    props: true,
  },
  {
    path: "/info/:id",
    name: "info",
    component: () => import("../views/InfoView.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFound404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
