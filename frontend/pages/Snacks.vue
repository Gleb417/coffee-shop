<template>
  <div class="category-page" style="padding-top: 0px;">
    <!-- Подключаем Header -->
    <Header />

    <div class="content">
      <h1>Десерты</h1>
      <p class="subtitle">Наслаждайтесь нашими сладкими угощениями.</p>

      <!-- Блок фильтров -->
      <div class="filters">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Поиск по названию..."
          class="search-input"
        />

        <select v-model="selectedWeight" class="filter-select">
          <option value="">Любой вес</option>
          <option value="small">Маленький (до 150 г)</option>
          <option value="medium">Средний (150-350 г)</option>
          <option value="large">Большой (более 350 г)</option>
        </select>
      </div>

      <!-- Отображаем карточки десертов -->
      <div class="products">
        <router-link
          v-for="product in filteredDesserts"
          :key="product.id"
          :to="{ name: 'ProductDetail', query: { id: product.id } }"
          class="product-card"
        >
          <img
            :src="getImageUrl(product.imageUrl)"
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
    </div>

    <!-- Подключаем Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const products = ref([]);
const searchQuery = ref("");
const selectedWeight = ref("");

// Загрузка данных
onMounted(() => {
  fetch("http://localhost:3001/api/product/Product/get")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});

// Фильтрация десертов по названию и весу
const filteredDesserts = computed(() => {
  return products.value
    .filter((product) => product.type === "dessert")
    .filter((product) => 
      searchQuery.value 
        ? product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
        : true
    )
    .filter((product) => 
      selectedWeight.value 
        ? selectedWeight.value === "small"
          ? product.weight <= 150
          : selectedWeight.value === "medium"
          ? product.weight > 150 && product.weight <= 350
          : selectedWeight.value === "large"
          ? product.weight > 350
          : true
        : true
    );
});

// Получение пути изображения
const getImageUrl = (imagePath) => {
  return imagePath ? `http://localhost:3001${imagePath}` : "/images/default.jpg";
};
</script>

<style scoped>
/* Основной контейнер */
.category-page {
  background-color: #f8f4f1;
  padding-top: 60px; /* Уменьшили отступ сверху */
}

/* Контент */
.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Заголовок */
h1 {
  font-size: 2rem;
  color: #5a3e2b;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #7a5a47;
  margin-bottom: 20px;
}

/* Фильтры */
.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input, .filter-select {
  padding: 8px 12px;
  border: 1px solid #d0c5b8;
  border-radius: 5px;
  font-size: 1rem;
}

.search-input {
  width: 250px;
}

.filter-select {
  width: 160px;
  background-color: white;
}

/* Сетка товаров */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

/* Карточка товара */
.product-card {
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-decoration: none;
}

.product-card:hover {
  transform: translateY(-5px);
}

/* Изображение товара */
.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 2px solid #e6d5c7;
}

/* Информация о товаре */
.product-info {
  padding: 15px;
  text-align: center;
}

.product-name {
  font-size: 1.2rem;
  color: #5a3e2b;
  font-weight: bold;
}

.product-description {
  font-size: 0.9rem;
  color: #77685d;
  margin: 8px 0;
}

.product-price {
  font-size: 1.2rem;
  color: #d46b3f;
  font-weight: bold;
  margin-top: 5px;
}
</style>
