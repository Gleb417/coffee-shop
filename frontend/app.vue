<template>
  <div id="app">
    <!-- Основной контент приложения -->
    <router-view />

    <!-- Кнопка для перехода в корзину -->
    <button class="cart-button" @click="goToCart">Корзина</button>

    <!-- Footer -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router"; // Импорт Vue Router
import Footer from "./components/Footer.vue"; // Импорт Footer компонента

const router = useRouter();

// Функция для перехода на страницу корзины
const goToCart = () => {
  router.push("/cart"); // Перенаправляем на страницу корзины
};

// Перенаправление на главную страницу, если текущий путь не "/"
onMounted(() => {
  if (router.currentRoute.value.path !== "/") {
    router.push("/"); // Перенаправляем на главную
  }
});
</script>

<style scoped>
/* Основные стили приложения */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Стили для кнопки корзины */
.cart-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #cca763;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.cart-button:hover {
  background-color: #b88a4d;
  transform: scale(1.1);
}

.cart-button:active {
  transform: scale(0.9);
}
</style>
