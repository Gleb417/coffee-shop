<template>
  <div class="profile-page">
    <Header />

    <div class="profile-content">
      <h1>Профиль</h1>

      <button @click="logout" class="logout-button">Выйти</button>

      <!-- Кнопка для админа -->
      <div v-if="user && user.role === 'admin'" class="admin-panel">
        <button @click="goToAdmin" class="admin-button">Панель администрирования</button>
      </div>

      <div v-if="user" class="profile-info">
        <h2>Личная информация</h2>
        <p><strong>Имя:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Телефон:</strong> {{ user.phone }}</p>
      </div>

      <div v-else>
        <p>Загрузка данных...</p>
      </div>

      <div class="order-history">
        <h2>История заказов</h2>
        <ul>
          <li v-for="order in orders" :key="order.id" class="order">
            <h3>Заказ №{{ order.id }} - {{ order.created_at }}</h3>
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

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

// Функция для получения значения cookie по имени
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// Функция для удаления cookie
function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-1; path=/;`;
}

const user = ref(null);
const orders = ref([]);
const router = useRouter();

onMounted(() => {
  const userToken = getCookie("token");

  if (userToken) {
    const decodedToken = JSON.parse(atob(userToken.split(".")[1]));
    const userId = decodedToken.id;

    // Запрос к API за данными пользователя
    fetch(`http://localhost:3001/api/user/users/${userId}`)
      .then((response) => response.json())
      .then((data) => (user.value = data))
      .catch((error) => console.error(error));

    // Запрос к API за историей заказов
    fetch(`http://localhost:3001/api/orders/order/user/${userId}`)
      .then((response) => response.json())
      .then((data) => (orders.value = data))
      .catch((error) => console.error(error));
  }
});

// Функция для выхода из профиля
function logout() {
  deleteCookie("token");
  router.push("/"); // Перенаправляем пользователя на страницу входа
}

// Функция для перехода на страницу админки
function goToAdmin() {
  router.push("/admin"); // Убедитесь, что роутер настроен на данный путь
}
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

.logout-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
}

.logout-button:hover {
  background-color: #e04344;
}

.admin-panel {
  margin-bottom: 20px;
}

.admin-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.admin-button:hover {
  background-color: #0056b3;
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
