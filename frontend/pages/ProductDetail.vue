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

        <!-- Кнопка добавления в корзину -->
        <button @click="addToCart" class="add-to-cart-btn">Добавить в корзину</button>
      </template>
      <p v-else>Загрузка данных...</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);

onMounted(() => {
  const productId = route.query.id; 

  fetch(`http://localhost:3001/api/product/Product/get/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      product.value = data;
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
});

// Добавление товара в корзину
const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Проверяем, есть ли товар уже в корзине
  const existingProduct = cart.find((item) => item.id === product.value.id);
  if (existingProduct) {
    existingProduct.quantity += 1; // Увеличиваем количество
  } else {
    cart.push({ ...product.value, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Перенаправление на страницу корзины (можно убрать, если не нужно)
  router.push({ name: "CartPage" });
};
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

.add-to-cart-btn {
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 15px;
}

.add-to-cart-btn:hover {
  background-color: #ff5722;
}
</style>
