<!-- pages/product/[id].vue -->
<template>
  <div class="product-page">
    <Header />

    <div class="product-details">
      <img :src="product.image" alt="Product" class="product-image" />
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price }}₽</p>
        <p class="description">{{ product.description }}</p>
        <button class="btn add-to-cart">Добавить в корзину</button>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const route = useRoute();

// Пример данных о товаре
const products = [
  {
    id: 1,
    title: "Капучино",
    price: 250,
    description: "Классический капучино с мягким вкусом и насыщенной пенкой.",
    image: "/images/coffee1.jpg",
  },
  {
    id: 2,
    title: "Торт Чизкейк",
    price: 350,
    description: "Нежный и кремовый чизкейк с ягодным топпингом.",
    image: "/images/dessert1.jpg",
  },
  {
    id: 3,
    title: "Эспрессо",
    price: 150,
    description: "Насыщенный и крепкий эспрессо для любителей кофе.",
    image: "/images/coffee2.jpg",
  },
];

// Получаем продукт по ID
const product = products.find((p) => p.id === parseInt(route.params.id));
</script>

<style scoped>
.product-page {
  padding: 20px;
}

.product-details {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
}

.product-image {
  max-width: 400px;
  height: auto;
  border-radius: 10px;
}

.product-info {
  max-width: 600px;
}

.product-info h1 {
  font-size: 2rem;
  color: var(--coffee-brown);
}

.price {
  font-size: 1.5rem;
  color: var(--golden-beige);
  font-weight: bold;
}

.description {
  font-size: 1.1rem;
  color: var(--coffee-brown);
  margin-top: 15px;
}

.add-to-cart {
  padding: 12px 20px;
  background-color: var(--golden-beige);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-top: 20px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: var(--coffee-brown);
  transform: scale(1.05);
}
</style>
