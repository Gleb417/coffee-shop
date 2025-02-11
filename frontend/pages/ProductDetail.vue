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

            <!-- Перевод типа продукта на русский -->
            <p>Тип: {{ translatedType }}</p>

            <!-- Размер только для напитков -->
            <p v-if="product.type === 'drink'">Размер: {{ translatedSize }}</p>
            
            <!-- Вес только для тортов и десертов -->
            <p v-if="product.type === 'cake' || product.type === 'dessert'">Вес: {{ product.weight }} г</p>

            <!-- Выводим название подкатегории -->
            <p>Подкатегория: {{ translatedSubcategory }}</p>

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
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

// Переменные
const isAuthenticated = ref(false); // для статуса аутентификации
const product = ref(null); // хранение информации о продукте
const orderId = ref(null); // Храним orderId
const router = useRouter();

// Маппинг числовых идентификаторов подкатегорий на текст
const subcategoryMapping = {
  1: 'Напитки',
  2: 'Кофе',
  3: 'Торты',
  4: 'Десерты',
  5: 'Пироги',
  // добавьте сюда другие подкатегории по вашему усмотрению
};

// Маппинг для перевода размера напитка на русский
const sizeTranslation = {
  Small: 'Малый',
  Medium: 'Средний',
  Large: 'Большой',
};

// Функция для проверки наличия токена в cookies и получения userId из токена
const getUserIdFromToken = () => {
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  if (!token) return null;

  // Декодируем токен (предполагается, что это JWT)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(window.atob(base64));
  return decodedData.id; // Получаем id из декодированного токена
};

// Функция для создания нового заказа
const createOrder = async (userId) => {
  try {
    const orderResponse = await fetch("http://localhost:3001/api/orders/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
      body: JSON.stringify({
        user_id: userId,
        total_price: product.value.price, // Отправляем цену товара
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const orderData = await orderResponse.json();
    orderId.value = orderData.id; // Сохраняем ID заказа
    if (typeof window !== "undefined") {
      localStorage.setItem("orderId", orderId.value); // Сохраняем orderId в локальное хранилище
    }
    console.log("Новый заказ создан, ID:", orderId.value);
    return orderId.value;
  } catch (error) {
    console.error("Ошибка при создании заказа:", error.message);
  }
};

// Функция для добавления товара в заказ
const addItemToOrder = async (orderId, productId, price) => {
  try {
    const addItemResponse = await fetch("http://localhost:3001/api/orders/orderItem/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
      body: JSON.stringify({
        order_id: orderId, // Добавляем товар в текущий заказ
        product_id: productId, // id продукта
        quantity: 1, // Количество товара
        price: price, // Цена товара
      }),
    });

    if (!addItemResponse.ok) {
      throw new Error('Ошибка при добавлении товара в заказ');
    }

    const addItemData = await addItemResponse.json();
    console.log("Товар успешно добавлен в заказ:", addItemData);
  } catch (error) {
    console.error("Ошибка при добавлении товара в заказ:", error.message);
  }
};

// Функция для добавления товара в корзину
const addToCart = async () => {
  const userId = getUserIdFromToken(); // Получаем userId из токена

  if (product.value && isAuthenticated.value && userId) {
    // Проверяем, если уже есть orderId в localStorage, то используем его
    if (!orderId.value) {
      orderId.value = localStorage.getItem("orderId"); // Получаем orderId из localStorage, если есть
    }

    try {
      // Пытаемся получить заказ для текущего userId
      const existingOrderResponse = await fetch(`http://localhost:3001/api/orders/order/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
        },
      });

      // Проверяем ответ
      const existingOrderData = await existingOrderResponse.json();
      console.log("Полученные данные о заказе:", existingOrderData); // Логируем данные для отладки

      if (existingOrderResponse.ok && Array.isArray(existingOrderData) && existingOrderData.length > 0) {
        // Если заказ найден, добавляем товар в этот заказ
        orderId.value = existingOrderData[0].id; // Используем существующий заказ
        localStorage.setItem("orderId", orderId.value); // Сохраняем в localStorage
        console.log("Используем существующий заказ с ID:", orderId.value);

        // Добавляем товар в этот заказ
        await addItemToOrder(orderId.value, product.value.id, product.value.price);
      } else {
        // Если заказ не найден, создаем новый заказ
        console.log("Заказ не найден, создаем новый...");
        orderId.value = await createOrder(userId); // Создаем новый заказ и получаем его ID
        // Добавляем товар в новый заказ
        await addItemToOrder(orderId.value, product.value.id, product.value.price);
      }

    } catch (error) {
      console.error("Ошибка при запросе существующего заказа:", error);
      orderId.value = await createOrder(userId); // Создаем новый заказ, если ошибка в запросе
      // Добавляем товар в новый заказ
      await addItemToOrder(orderId.value, product.value.id, product.value.price);
    }

    // Перенаправление на страницу корзины
    router.push({ name: "cart" });
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

// Перевод типа продукта на русский
const typeTranslations = {
  drink: 'Напиток',
  coffee: 'Кофе',
  cake: 'Торт',
  dessert: 'Десерт',
};

const translatedType = computed(() => typeTranslations[product.value.type] || product.value.type);

// Перевод подкатегории
const translatedSubcategory = computed(() => subcategoryMapping[product.value.subcategory_id] || 'Неизвестная подкатегория');

// Перевод размера напитка
const translatedSize = computed(() => sizeTranslation[product.value.size] || product.value.size);
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