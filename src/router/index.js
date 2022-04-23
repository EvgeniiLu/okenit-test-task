import { createRouter, createWebHistory } from "vue-router";
import PostsView from "../views/PostsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PostsView,
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
