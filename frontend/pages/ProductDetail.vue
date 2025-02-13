<template>
  <div>
    <Header />
    
    <div v-if="isAuthenticated">
      <p>Вы зарегистрированы! Токен найден.</p>
    </div>
    <div v-else>
      <p>Вы не авторизованы. Токен не найден.</p>
    </div>

    <div class="product-detail-content">
      <template v-if="product">
        <div class="product-info-container">
          <img :src="`http://localhost:3001${product.imageUrl}`" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h1>{{ product.name }}</h1>
            <p class="description">Описание товара: {{ product.description }}</p>
            <p class="price">Цена: {{ product.price }} ₽</p>
            <p>Тип: {{ translatedType }}</p>
            <p v-if="product.type === 'drink'">Размер: {{ translatedSize }}</p>
            <p v-if="product.type === 'cake' || product.type === 'dessert'">Вес: {{ product.weight }} г</p>
            <p>Подкатегория: {{ translatedSubcategory }}</p>
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

const isAuthenticated = ref(false);
const product = ref(null);
const orderId = ref(null);
const router = useRouter();

// Подкатегории
const subcategoryMapping = {
  1: 'Напитки',
  2: 'Кофе',
  3: 'Торты',
  4: 'Десерты',
  5: 'Пироги',
};

// Размеры напитков
const sizeTranslation = {
  Small: 'Малый',
  Medium: 'Средний',
  Large: 'Большой',
};

// Декодирование токена и получение userId
const getUserIdFromToken = () => {
  const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));
    return decodedData.id;
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
};

// Создание нового заказа
const createOrder = async (userId) => {
  try {
    const response = await fetch("http://localhost:3001/api/orders/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
      body: JSON.stringify({
        user_id: userId,
        total_price: product.value.price,
      }),
    });

    if (!response.ok) throw new Error('Ошибка при создании заказа');

    const data = await response.json();
    orderId.value = data.id;
    localStorage.setItem("orderId", orderId.value);
    return orderId.value;
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
  }
};

// Добавление товара в заказ
const addItemToOrder = async (orderId, productId, price) => {
  try {
    const response = await fetch("http://localhost:3001/api/orders/orderItem/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        product_id: productId,
        quantity: 1,
        price: price,
      }),
    });

    if (!response.ok) throw new Error('Ошибка при добавлении товара в заказ');

    console.log("Товар успешно добавлен в заказ");
  } catch (error) {
    console.error("Ошибка при добавлении товара в заказ:", error);
  }
};

// Добавление товара в корзину
const addToCart = async () => {
  const userId = getUserIdFromToken();

  if (product.value && isAuthenticated.value && userId) {
    orderId.value = localStorage.getItem("orderId");

    try {
      const existingOrderResponse = await fetch(`http://localhost:3001/api/orders/order/user/${userId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
        },
      });

      const existingOrderData = await existingOrderResponse.json();

      if (
        existingOrderResponse.ok &&
        Array.isArray(existingOrderData) &&
        existingOrderData.length > 0
      ) {
        // Проверяем, есть ли активный заказ (не в статусе "doing")
        const activeOrder = existingOrderData.find(order => order.status !== "doing");

        if (activeOrder) {
          orderId.value = activeOrder.id;
        } else {
          orderId.value = await createOrder(userId);
        }

        localStorage.setItem("orderId", orderId.value);
      } else {
        orderId.value = await createOrder(userId);
      }

      await addItemToOrder(orderId.value, product.value.id, product.value.price);
      router.push({ name: "cart" });

    } catch (error) {
      console.error("Ошибка при обработке заказа:", error);
      orderId.value = await createOrder(userId);
      await addItemToOrder(orderId.value, product.value.id, product.value.price);
    }
  } else {
    console.log("Пользователь не авторизован или продукт отсутствует.");
  }
};

// Получение данных о продукте
onMounted(() => {
  const productId = useRoute().query.id;
  fetch(`http://localhost:3001/api/product/Product/get/${productId}`)
    .then(response => response.json())
    .then(data => {
      product.value = data;
      checkCookieAuth();
    })
    .catch(error => console.error("Ошибка загрузки данных продукта:", error));
});

// Проверка наличия токена
const checkCookieAuth = () => {
  isAuthenticated.value = !!document.cookie.split("; ").find(row => row.startsWith("token="));
};

// Переводы
const typeTranslations = {
  drink: 'Напиток',
  coffee: 'Кофе',
  cake: 'Торт',
  dessert: 'Десерт',
};

const translatedType = computed(() => typeTranslations[product.value?.type] || product.value?.type);
const translatedSubcategory = computed(() => subcategoryMapping[product.value?.subcategory_id] || 'Неизвестная подкатегория');
const translatedSize = computed(() => sizeTranslation[product.value?.size] || product.value?.size);
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
  gap: 20px;
}

.product-image {
  width: 300px;
  border-radius: 8px;
}

.product-info {
  max-width: 500px;
}

.add-to-cart-btn {
  background-color: #ff7f50;
  color: white;
  padding: 12px 18px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #ff5722;
}
</style>
