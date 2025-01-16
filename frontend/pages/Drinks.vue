<template>
  <div class="category-page">
    <!-- Подключаем Header -->
    <Header />

    <h1>Напитки</h1>
    <p>Откройте для себя наши освежающие напитки.</p>

    <div class="products">
      <!-- Генерация карточек товаров на основе данных из API -->
      <router-link
        v-for="product in drinks"
        :key="product.id"
        :to="{ name: 'ProductDetail', query: { id: product.id } }"
        class="product-card"
      >
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="product-image"
        />
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-price">{{ product.price }} ₽</p>
        </div>
      </router-link>
    </div>

    <!-- Подключаем Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const products = ref([]); // Все товары

// Загружаем данные о товарах из API
onMounted(() => {
  fetch("http://localhost:3001/api/product/Product/get")
    .then((response) => response.json())
    .then((data) => {
      products.value = data; // Сохраняем все товары
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});

// Фильтруем только товары категории "drinks"
const drinks = computed(() =>
  products.value.filter((product) => product.type === "drink")
);
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
