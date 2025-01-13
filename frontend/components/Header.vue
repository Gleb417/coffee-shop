<!-- components/Header.vue -->
<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img
          src="assets/images/logo.png"
          alt="Lakrica Coffee"
          class="logo-img"
        />
      </router-link>
    </div>
    <nav>
      <router-link to="/" class="nav-item">Главная</router-link>
      <router-link to="/menu" class="nav-item">Меню</router-link>
      <router-link to="/about" class="nav-item">О нас</router-link>
      <router-link to="/contact" class="nav-item">Контакты</router-link>
      <!-- Добавляем кнопку для калькулятора -->
      <router-link to="/calculator" class="nav-item">Калькулятор</router-link>
      <router-link to="/auth" class="nav-item"
        >Авторизация / Регистрация</router-link
      >
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
/* Общее оформление для шапки */
header {
  background-color: #cca763; /* Цвет кофейного фона */
  padding: 20px 30px; /* Добавляем отступы сверху и снизу */
  position: relative; /* Для абсолютного позиционирования логотипа */
  display: flex;
  justify-content: center; /* Центрируем навигацию */
  align-items: center;
  flex-direction: column;
  min-height: 80px; /* Минимальная высота для шапки, чтобы логотип точно помещался */
}

/* Логотип в верхнем левом углу */
.logo {
  position: absolute;
  top: 20px;
  left: 30px;
  z-index: 2; /* Обеспечиваем, что логотип будет выше других элементов */
}

.logo img {
  width: 150px; /* Размер логотипа */
  height: auto; /* Пропорциональное изменение высоты */
}

/* Навигационное меню */
nav {
  display: flex;
  gap: 30px;
  justify-content: center; /* Центрируем кнопки навигации */
  align-items: center;
  flex-wrap: wrap; /* Поддержка адаптивности */
  z-index: 1; /* Обеспечиваем, что навигация будет сверху */
}

/* Стили для кнопок навигации */
.nav-item {
  color: #4e4e4e; /* Темно-коричневый для текста */
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;
  position: relative; /* Для создания эффекта подчеркивания */
  padding: 10px 20px; /* Внутренний отступ */
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.7); /* Легкий полупрозрачный фон */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Легкая тень для кнопок */
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
}

/* Эффект наведения для кнопок */
.nav-item:hover {
  color: #cca763; /* Цвет текста при наведении */
  background-color: #f8f5eb; /* Светлый фон при наведении */
  transform: translateY(-5px); /* Эффект поднятия кнопки */
}

/* Подчеркивание при наведении */
.nav-item::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #cca763; /* Цвет подчеркивания */
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease;
}

/* Появление подчеркивания при наведении */
.nav-item:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
