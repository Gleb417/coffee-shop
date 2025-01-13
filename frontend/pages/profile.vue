<template>
  <div class="profile-page">
    <!-- Подключаем Header -->
    <Header />

    <div class="profile-content">
      <h1>Профиль</h1>

      <div class="profile-info">
        <h2>Личная информация</h2>
        <p><strong>Имя:</strong> Иван</p>
        <p><strong>Фамилия:</strong> Иванов</p>
        <p><strong>Email:</strong> ivanov@example.com</p>
        <p><strong>Телефон:</strong> +7 999 123 45 67</p>
      </div>

      <div class="order-history">
        <h2>История заказов</h2>
        <ul>
          <li v-for="order in orders" :key="order.id" class="order">
            <h3>Заказ №{{ order.id }} - {{ order.date }}</h3>
            <p><strong>Общая сумма:</strong> {{ order.total }} ₽</p>
            <div class="order-items">
              <h4>Товары:</h4>
              <ul>
                <li v-for="item in order.items" :key="item.name">
                  {{ item.name }} - {{ item.price }} ₽ ({{ item.quantity }} шт.)
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Подключаем Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

// Пример данных истории заказов
const orders = ref([
  {
    id: 1,
    date: "10.01.2025",
    total: 1200,
    items: [
      { name: "Муссовый торт", price: 600, quantity: 1 },
      { name: "Кофе эспрессо", price: 250, quantity: 2 },
    ],
  },
  {
    id: 2,
    date: "05.01.2025",
    total: 550,
    items: [{ name: "Тирамису", price: 550, quantity: 1 }],
  },
]);
</script>

<style scoped>
.profile-page {
  padding: 20px;
  background-color: #f4f4f4;
}

.profile-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #3e2b1d;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  color: #3e2b1d;
  margin-bottom: 15px;
}

h3 {
  font-size: 1.2rem;
  color: #3e2b1d;
  margin: 10px 0;
}

h4 {
  font-size: 1.1rem;
  color: #555;
  margin: 10px 0;
}

.profile-info p {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.order-history ul {
  list-style-type: none;
  padding: 0;
}

.order {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
}

.order-items ul {
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
}

.order-items li {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.order-items li strong {
  color: #3e2b1d;
}
</style>
