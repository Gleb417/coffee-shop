<template>
  <div class="category-page">
    <!-- Подключаем Header -->
    <Header />

    <h1>Торты</h1>
    <p>Наши лучшие торты, приготовленные с любовью.</p>

    <div class="products">
      <!-- Карточка 1 -->
      <div class="product-card">
        <img src="assets/images/cakes1.jpg" alt="Cake" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">Шоколадный торт</h3>
          <p class="product-description">
            Нежный шоколадный бисквит с кремом из темного шоколада.
          </p>
          <p class="product-price">500 ₽</p>
        </div>
      </div>

      <!-- Карточка 2 -->
      <div class="product-card">
        <img src="assets/images/cakes2.jpg" alt="Cake" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">Торт "Наполеон"</h3>
          <p class="product-description">
            Классический торт с хрустящими слоями и кремом.
          </p>
          <p class="product-price">450 ₽</p>
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
