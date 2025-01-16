// src/router/index.js (или в соответствующем файле, если у вас используется Vue Router)
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/index.vue"),
  },
  {
    path: "/menu",
    component: () => import("../pages/menu.vue"),
  },
  {
    path: "/menu/drinks",
    component: () => import("../pages/Drinks.vue"), // Страница для напитков
  },
  {
    path: "/menu/snacks",
    component: () => import("../pages/Snacks.vue"), // Страница для тортов
  },
  {
    path: "/menu/desserts",
    component: () => import("../pages/Desserts.vue"), // Страница для десертов
  },
  {
    path: "/auth",
    component: () => import(".../pages/auth.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/pages/profile.vue"), // Укажите путь к компоненту страницы профиля
  },
  {
    path: "/product/:id",
    name: "ProductDetail",
    component: ProductDetail,
    props: true, // Передача параметров в виде пропсов
  },
  {
    path: "/cart",
    component: () => import(".../pages/cart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
