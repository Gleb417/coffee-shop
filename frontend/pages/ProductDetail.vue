<template>
  <div class="product-detail">
    <Header />
    <div class="product-detail-content">
      <template v-if="product">
        <img
          :src="`http://localhost:3001${product.imageUrl}`"
          :alt="product.name"
          class="product-image"
        />
        <h1>Карточка товара: {{ product.name }}</h1>
        <p>Описание товара: {{ product.description }}</p>
        <p>Цена: {{ product.price }} ₽</p>
        <p>Тип: {{ product.type }}</p>
        <p>Размер: {{ product.size }}</p>
        <p>Вес: {{ product.weight }} г</p>
        <p>Подкатегория ID: {{ product.subcategory_id }}</p>
      </template>
      <p v-else>Загрузка данных...</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const route = useRoute();
const product = ref(null); // Реактивная переменная для данных товара

onMounted(() => {
  const productId = route.query.id; // Получаем ID товара из параметров маршрута

  // Запрос к API для получения данных о товаре
  fetch(`http://localhost:3001/api/product/Product/get/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      product.value = data; // Сохраняем данные в реактивной переменной
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});
</script>

<style scoped>
.product-detail-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}
</style>
