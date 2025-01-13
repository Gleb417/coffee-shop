<template>
  <div class="cart-page">
    <!-- Подключаем Header -->
    <Header />

    <h1>Активные заказы</h1>

    <div v-if="orders.length" class="orders">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <h2>Заказ №{{ order.id }} — {{ order.date }}</h2>
        <p class="order-total">
          Сумма заказа: <strong>{{ order.total }} ₽</strong>
        </p>
        <div class="order-items">
          <div
            v-for="(item, index) in order.items"
            :key="index"
            class="item-card"
          >
            <img :src="item.image" :alt="item.name" class="item-image" />
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <p>Цена: {{ item.price }} ₽</p>
              <p>Количество: {{ item.quantity }}</p>
              <button @click="cancelItem(order.id, index)" class="cancel-btn">
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Ваша история заказов пуста.</p>
    </div>

    <!-- Подключаем Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue"; // Импорт Header компонента
import Footer from "~/components/Footer.vue"; // Импорт Footer компонента

import { reactive } from "vue";

// Пример заказов (реактивный, чтобы изменения сразу отображались)
const orders = reactive([
  {
    id: 1,
    date: "2025-01-10",
    total: 1150,
    items: [
      {
        name: "Муссовый торт",
        image: "assets/images/dessert1.jpg",
        description: "Нежный мусс с фруктовым вкусом и хрустящей основой.",
        price: 600,
        quantity: 1,
      },
      {
        name: "Кофе эспрессо",
        image: "assets/images/coffee1.jpg",
        description:
          "Насыщенный вкус и аромат, идеально подходящий для бодрости.",
        price: 250,
        quantity: 2,
      },
    ],
  },
  {
    id: 2,
    date: "2025-01-12",
    total: 800,
    items: [
      {
        name: "Латте",
        image: "assets/images/coffee2.jpg",
        description:
          "Смесь молока и кофе для мягкого вкуса и утреннего настроения.",
        price: 300,
        quantity: 2,
      },
    ],
  },
]);

// Метод для отмены товара
const cancelItem = (orderId, itemIndex) => {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  // Удаляем один товар из заказа
  const item = order.items[itemIndex];
  item.quantity--;

  // Если количество товара стало 0, удаляем его полностью
  if (item.quantity === 0) {
    order.items.splice(itemIndex, 1);
  }

  // Если заказ пуст после удаления, удаляем весь заказ
  if (order.items.length === 0) {
    const orderIndex = orders.indexOf(order);
    orders.splice(orderIndex, 1);
  }

  // Обновляем общую сумму заказа
  order.total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
  background-color: #f4f4f4;
}

h1 {
  font-size: 2rem;
  color: #3e2b1d;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.orders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-card h2 {
  font-size: 1.4rem;
  color: #3e2b1d;
}

.order-total {
  font-size: 1.2rem;
  color: #ff7f50;
  margin: 10px 0;
}

.order-items {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.item-card {
  display: flex;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.item-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-info h3 {
  font-size: 1.1rem;
  color: #3e2b1d;
  margin: 0;
}

.item-info p {
  font-size: 0.9rem;
  margin: 5px 0;
}

.item-info p:last-child {
  font-weight: bold;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.cancel-btn:hover {
  background-color: #c0392b;
}
</style>
