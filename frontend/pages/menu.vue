<template>
  <div class="menu-page">
    <Header />
    <h2 data-aos="fade-up" data-aos-duration="800">Наше меню</h2>
    <div class="menu-categories">
      <!-- Кнопка для Напитков -->
      <router-link
        to="Drinks"
        class="menu-item drinks"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="100"
      >
        <div class="menu-overlay">
          <h3>Напитки</h3>
        </div>
      </router-link>

      <!-- Кнопка для Закусок -->
      <router-link
        to="Desserts"
        class="menu-item snacks"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <div class="menu-overlay">
          <h3>Торты</h3>
        </div>
      </router-link>

      <!-- Кнопка для Десертов -->
      <router-link
        to="Snaks"
        class="menu-item desserts"
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-delay="300"
      >
        <div class="menu-overlay">
          <h3>Десерты</h3>
        </div>
      </router-link>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

// Инициализация AOS только на клиентской стороне
onMounted(() => {
  if (typeof window !== "undefined") {
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
      });
    });
  }
});
</script>

<style scoped>
.menu-page {
  padding: 20px;
  text-align: center;
  background-color: #daad6b;
}

h2 {
  font-size: 2rem;
  color: #3e2b1d;
  margin-bottom: 20px;
}

/* Стили для контейнера с категориями */
.menu-categories {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 100vh; /* Занимает всю высоту экрана */
}

.menu-item {
  position: relative;
  display: block;
  width: 32%; /* Каждая кнопка занимает 1/3 ширины */
  height: 100%; /* Кнопки растягиваются по высоте */
  border-radius: 5px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease-in-out; /* Плавное увеличение */
}

.menu-item .menu-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон */
  padding: 10px 20px;
  border-radius: 5px;
}

.menu-item h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

/* Стили для кнопок с изображениями */
.menu-item.drinks {
  background-image: url("assets/images/coffee1.jpg");
  background-size: cover;
  background-position: center;
}

.menu-item.snacks {
  background-image: url("assets/images/cakes1.jpg");
  background-size: cover;
  background-position: center;
}

.menu-item.desserts {
  background-image: url("assets/images/dessert1.jpg");
  background-size: cover;
  background-position: center;
}

/* Эффект при наведении */
.menu-item:hover {
  transform: scale(1.05); /* Увеличение кнопки при наведении */
}

.menu-item:hover .menu-overlay {
  background-color: rgba(0, 0, 0, 0.7); /* Темнее фон при наведении */
}

/* Эффект для увеличения элемента меню при прокрутке с AOS */
.menu-item[data-aos="zoom-in"] {
  transition: transform 0.6s ease-in-out;
}
</style>
