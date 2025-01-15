<template>
  <div class="category-page">
    <!-- Подключаем Header -->
    <Header />

    <h1>Десерты</h1>
    <p>Наслаждайтесь нашими сладкими угощениями.</p>

    <div class="products">
      <!-- Отображаем карточки десертов -->
      <div v-for="product in desserts" :key="product.id" class="product-card">
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
      </div>
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

onMounted(() => {
  // Запрос к API для получения данных о продуктах
  fetch("http://localhost:3001/api/product/Product/get/")
    .then((response) => response.json())
    .then((data) => {
      products.value = data; // Сохраняем данные о продуктах
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});

// Фильтруем только десерты
const desserts = computed(() =>
  products.value.filter((product) => product.type === "cake")
);
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
