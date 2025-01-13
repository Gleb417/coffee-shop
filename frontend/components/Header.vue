<template>
  <header>
    <!-- Логотип (только для десктопной версии) -->
    <div class="logo" v-if="!isMobile">
      <router-link to="/">
        <img
          src="assets/images/logo.png"
          alt="Lakrica Coffee"
          class="logo-img"
        />
      </router-link>
    </div>

    <!-- Бургер-меню для мобильных -->
    <div class="burger-menu" v-if="isMobile" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Навигационное меню -->
    <nav :class="{ 'menu-open': isMenuOpen || !isMobile }">
      <router-link to="/" class="nav-item">Главная</router-link>
      <router-link to="/menu" class="nav-item">Меню</router-link>
      <router-link to="/about" class="nav-item">О нас</router-link>
      <router-link to="/contact" class="nav-item">Контакты</router-link>
      <router-link to="/calculator" class="nav-item">Калькулятор</router-link>
      <router-link to="/auth" class="nav-item"
        >Авторизация / Регистрация</router-link
      >
      <router-link to="/profile" class="nav-item">Профиль</router-link>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Управление состоянием меню
const isMenuOpen = ref(false);
const isMobile = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Проверка ширины экрана
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768; // Ширина экрана для переключения в мобильный режим
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener("resize", checkIfMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});
</script>

<style scoped>
/* Общие стили для хедера */
header {
  background-color: #cca763;
  padding: 20px 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80px;
}

/* Логотип */
.logo {
  position: absolute;
  top: 20px;
  left: 30px;
}

.logo img {
  width: 150px;
  height: auto;
}

/* Навигация */
nav {
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  z-index: 1;
  transition: max-height 0.3s ease;
}

nav.menu-open {
  display: flex;
  max-height: 500px; /* Максимальная высота при открытом меню */
}

nav:not(.menu-open) {
  max-height: 0;
  overflow: hidden;
}

.nav-item {
  color: #4e4e4e;
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
}

.nav-item:hover {
  color: #cca763;
  background-color: #f8f5eb;
  transform: translateY(-5px);
}

/* Бургер-меню */
.burger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  cursor: pointer;
}

.burger-menu span {
  display: block;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .burger-menu {
    display: flex; /* Показываем бургер-меню */
  }

  nav {
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: #cca763;
    padding: 20px 0;
    display: none; /* По умолчанию скрыто */
  }

  nav.menu-open {
    display: flex; /* Показываем меню при открытии */
  }

  .nav-item {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }
}
</style>
