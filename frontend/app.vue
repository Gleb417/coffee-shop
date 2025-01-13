<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router"; // Импортируем Vue Router
import Footer from "./components/Footer.vue"; // Импорт компонента футера

// Используем Router для перенаправления при загрузке
const router = useRouter();

onMounted(() => {
  // Перенаправление на главную страницу, если текущий путь не "/"
  if (router.currentRoute.value.path !== "/") {
    router.push("/"); // Перенаправляем на главную
  }
});
</script>

<style scoped>
/* Стили для приложения */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
