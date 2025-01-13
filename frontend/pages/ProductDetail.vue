<template>
  <div class="product-detail">
    <Header />
    <div class="product-detail-content">
      <h1>Карточка товара: {{ productName }}</h1>
      <p>Описание товара: {{ productDescription }}</p>
      <p>Цена: {{ productPrice }} ₽</p>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Пример данных
const products = [
  {
    id: 1,
    name: "Кофе эспрессо",
    description: "Насыщенный вкус и аромат.",
    price: 250,
  },
  {
    id: 2,
    name: "Латте",
    description: "Смесь молока и кофе для мягкого вкуса.",
    price: 300,
  },
];

// Поиск товара по ID
const product = computed(() => {
  return products.find((p) => p.id === Number(route.params.id)) || {};
});

const productName = computed(() => product.value.name || "Не найден");
const productDescription = computed(
  () => product.value.description || "Описание отсутствует"
);
const productPrice = computed(() => product.value.price || 0);
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
</style>
