// src/router/index.js (или в соответствующем файле, если у вас используется Vue Router)
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/menu',
    component: () => import('../pages/menu.vue'),
  },
  {
    path: '/menu/drinks',
    component: () => import('../pages/Drinks.vue'),  // Страница для напитков
  },
  {
    path: '/menu/snacks',
    component: () => import('../pages/Snacks.vue'),  // Страница для тортов
  },
  {
    path: '/menu/desserts',
    component: () => import('../pages/menu/Desserts.vue'),  // Страница для десертов
  },
  {
    path: '/auth',
    component: () => import('.../pages/auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
