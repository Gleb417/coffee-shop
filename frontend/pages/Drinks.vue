<template>
  <div class="category-page">
    <!-- Подключаем Header -->
    <Header />

    <h1>Напитки</h1>
    <p>Откройте для себя наши освежающие напитки.</p>

    <div class="products">
      <!-- Карточка 1 -->
      <div class="product-card">
        <img
          src="assets/images/coffee1.jpg"
          alt="Coffee"
          class="product-image"
        />
        <div class="product-info">
          <h3 class="product-name">Кофе эспрессо</h3>
          <p class="product-description">
            Насыщенный вкус и аромат, идеально подходящий для бодрости.
          </p>
          <p class="product-price">250 ₽</p>
        </div>
      </div>

      <!-- Карточка 2 -->
      <div class="product-card">
        <img
          src="assets/images/coffee2.jpg"
          alt="Latte"
          class="product-image"
        />
        <div class="product-info">
          <h3 class="product-name">Латте</h3>
          <p class="product-description">
            Смесь молока и кофе для мягкого вкуса и утреннего настроения.
          </p>
          <p class="product-price">300 ₽</p>
        </div>
      </div>
    </div>

    <!-- Подключаем Footer -->
    <Footer />
  </div>
</template>

<script setup>
// Импортируем Header и Footer компоненты
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.category-page {
  padding: 20px;
  background-color: #f4f4f4;
}

h1 {
  font-size: 2rem;
  color: #3e2b1d;
  margin-bottom: 20px;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 15px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  color: #3e2b1d;
  font-weight: bold;
}

.product-description {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.product-price {
  font-size: 1.2rem;
  color: #ff7f50;
  font-weight: bold;
}
</style>
