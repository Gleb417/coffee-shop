<template>
  <div>
    <Header />

    <!-- Показать статус авторизации -->
    <div v-if="isAuthenticated">
      <p>Вы зарегистрированы! Токен найден.</p>
    </div>
    <div v-else>
      <p>Вы не авторизованы. Токен не найден.</p>
    </div>

    <div class="product-detail-content">
      <template v-if="product">
        <div class="product-info-container">
          <!-- Картинка слева -->
          <img
            :src="`http://localhost:3001${product.imageUrl}`"
            :alt="product.name"
            class="product-image"
          />
          
          <!-- Информация справа -->
          <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p class="description">Описание товара: {{ product.description }}</p>
            <p class="price">Цена: {{ product.price }} ₽</p>
            <p>Тип: {{ product.type }}</p>
            
            <!-- Размер только для напитков и кофе -->
            <p v-if="product.type === 'drink' || product.type === 'coffee'">Размер: {{ product.size }}</p>
            
            <!-- Вес только для тортов -->
            <p v-if="product.type === 'cake'">Вес: {{ product.weight }} г</p>

            <!-- Выводим название подкатегории -->
            <p>Подкатегория: {{ product.subcategoryName }}</p>

            <!-- Кнопка добавления в корзину -->
            <button @click="addToCart" class="add-to-cart-btn">Добавить в корзину</button>
          </div>
        </div>
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

// Переменные
const isAuthenticated = ref(false); // для статуса аутентификации
const product = ref(null); // хранение информации о продукте
const cart = ref([]); // Массив для хранения товаров в корзине
const router = useRouter();
let orderId = null; // Храним orderId на уровне компонента

// Функция для проверки наличия токена в cookies и получения id из токена
const getIdFromToken = () => {
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  if (!token) return null;

  // Декодируем токен (предполагается, что это JWT)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(window.atob(base64));
  return decodedData.id; // Получаем id из декодированного токена
}

// Функция для создания нового заказа
const createOrder = async (totalPrice) => {
  const userId = getIdFromToken(); // Получаем id из токена

  if (product.value && isAuthenticated.value && userId) {
    try {
      // Создаем новый заказ, передаем только user_id и total_price
      const orderResponse = await fetch("http://localhost:3001/api/orders/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
        },
        body: JSON.stringify({
          user_id: userId, // Передаем user_id из токена
          total_price: totalPrice,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Ошибка при создании заказа');
      }

      const orderData = await orderResponse.json();
      orderId = orderData.id; // Сохраняем ID заказа
      localStorage.setItem("orderId", orderId); // Сохраняем orderId в локальное хранилище
    } catch (error) {
      console.error("Ошибка при создании заказа:", error.message);
    }
  }
};

// Функция для добавления товара в заказ
const addToCart = async () => {
  const userId = getIdFromToken(); // Получаем id из токена

  if (product.value && isAuthenticated.value && userId) {
    try {
      // Если у нас еще нет orderId, создаем новый заказ
      if (!orderId) {
        await createOrder(product.value.price); // Создаем заказ с ценой товара
      }

      // Добавляем товар в существующий или новый заказ
      const itemResponse = await fetch("http://localhost:3001/api/orders/orderItem/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
        },
        body: JSON.stringify({
          orderId: orderId, // Используем существующий или новый orderId
          price: product.value.price, // Передаем цену товара
        }),
      });

      if (!itemResponse.ok) {
        throw new Error('Ошибка при добавлении товара в корзину');
      }

      // Добавляем товар в локальную корзину (реактивное состояние)
      cart.value.push(product.value);
      localStorage.setItem('cart', JSON.stringify(cart.value)); // Сохраняем в локальное хранилище

      console.log("Товар успешно добавлен в корзину");
      router.push({ name: "cart" }); // Перенаправляем на страницу корзины

    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  } else {
    console.log("Пользователь не авторизован или продукт отсутствует.");
  }
};

// Получаем данные о продукте
onMounted(() => {
  const productId = useRoute().query.id;
  fetch(`http://localhost:3001/api/product/Product/get/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      product.value = data;
      checkCookieAuth(); // Проверяем наличие токена
    })
    .catch((error) => console.error("Ошибка загрузки данных продукта:", error));
});

// Проверка наличия токена
const checkCookieAuth = () => {
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="));
  isAuthenticated.value = !!token; // Если токен найден, считаем пользователя авторизованным
};
</script>

<style scoped>
.product-detail-content {
  padding: 20px;
  background-color: #f8f4e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.product-image {
  width: 300px;
  height: auto;
  border-radius: 8px;
}

.product-info {
  max-width: 500px;
  text-align: left;
}

.product-info h1 {
  font-size: 2rem;
  color: #5a3e2b;
  margin-bottom: 10px;
}

.description {
  font-size: 1rem;
  color: #6c4f3d;
  margin-bottom: 15px;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff7f50;
  margin-bottom: 15px;
}

.product-info p {
  font-size: 1rem;
  color: #7a5a47;
  margin-bottom: 8px;
}

.add-to-cart-btn {
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.add-to-cart-btn:hover {
  background-color: #ff5722;
}
</style>
