import { createRouter, createWebHistory } from "vue-router";
import CatalogView from "../views/CatalogView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: CatalogView,
    },
    {
      path: "/pokemon/:id",
      name: "detalles",
      component: () => import("../views/PokemonDetailsView.vue"),
    },
  ],
});

export default router;
