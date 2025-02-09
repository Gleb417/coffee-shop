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
    <div
      class="burger-menu"
      :class="{ 'menu-active': isMenuOpen }"
      v-if="isMobile"
      @click="toggleMenu"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Навигационное меню -->
    <nav :class="{ 'menu-open': isMenuOpen || !isMobile }">
      <router-link to="/" class="nav-item" @click="handleNavItemClick"
        >Главная</router-link
      >
      <router-link to="/menu" class="nav-item" @click="handleNavItemClick"
        >Меню</router-link
      >
      <router-link to="/about" class="nav-item" @click="handleNavItemClick"
        >О нас</router-link
      >
      <router-link to="/contact" class="nav-item" @click="handleNavItemClick"
        >Контакты</router-link
      >
      <router-link to="/calculator" class="nav-item" @click="handleNavItemClick"
        >Калькулятор</router-link
      >
      <router-link
        v-if="isAuthenticated"
        to="/profile"
        class="nav-item"
        @click="handleNavItemClick"
        >Профиль</router-link
      >
      <router-link
        v-else
        to="/auth"
        class="nav-item"
        @click="handleNavItemClick"
        >Авторизация / Регистрация</router-link
      >
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Управление состоянием меню
const isMenuOpen = ref(false);
const isMobile = ref(false);
const isAuthenticated = ref(false); // Состояние регистрации пользователя
// Функция проверки наличия куки
const checkCookieAuth = () => {
  const cookies = document.cookie.split("; ");
  const cookieValue = cookies.find((row) => row.startsWith("token="));
  isAuthenticated.value = !!cookieValue; // Устанавливаем isAuthenticated в true, если кука найдена
};
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};



// Закрытие меню при клике на элемент
const handleNavItemClick = () => {
  if (isMobile.value) {
    isMenuOpen.value = false;
  }
};

// Проверка ширины экрана
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768; // Ширина экрана для переключения в мобильный режим
};

onMounted(() => {
  checkCookieAuth();
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
  transition: transform 0.3s ease;
}

.burger-menu.menu-active {
  transform: rotate(90deg);
}

.burger-menu span {
  display: block;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* Анимация бургер-меню */
.burger-menu.menu-active span:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.burger-menu.menu-active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.menu-active span:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
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
