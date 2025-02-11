<template>
  <div>
    <Header />

    <div v-if="orders.length > 0" class="orders-container">
      <h1>Ваши заказы</h1>

      <div v-for="order in orders" :key="order.id" class="order">
        <h2>Заказ №{{ order.id }}</h2>
        <p>Общая сумма: {{ order.total_price }} ₽</p>

        <div class="order-items">
          <h3>Товары:</h3>
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <img :src="`http://localhost:3001${item.product.imageUrl}`" :alt="item.product.name" class="item-image" />
            <div class="item-info">
              <h4>{{ item.product.name }}</h4>
              <p>Цена: {{ item.price }} ₽</p>
              <button v-if="order.status !== 'doing'" @click="removeItemFromOrder(item.id, order.id)">Удалить товар</button>
            </div>
          </div>

          <!-- Вывод кастомного напитка, если он есть -->
          <div v-if="order.customDrink" class="custom-drink">
            <h4>Кастомный напиток:</h4>
            <p>{{ order.customDrink.name }}</p>
            <p>Цена: {{ order.customDrink.price }} ₽</p>
          </div>
        </div>

        <button 
          v-if="order.status !== 'doing'" 
          @click="markOrderAsDoing(order.id)" 
          class="create-order-btn">
          Оформить заказ
        </button>

        <button 
          @click="removeOrder(order.id)" 
          class="delete-order-btn" 
          :disabled="isOrderExpired(order)">
          Удалить заказ
        </button>
      </div>
    </div>

    <div v-else>
      <p>У вас нет заказов.</p>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const orders = ref([]); // Храним заказы
const userId = ref(null);

// Получаем userId из токена
const getUserIdFromToken = () => {
  if (typeof window === "undefined") return null;

  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(atob(base64));
    return decodedData.id;
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
};

// Загружаем заказы при монтировании
onMounted(() => {
  userId.value = getUserIdFromToken();
  if (userId.value) {
    fetchOrders();
  }
});

// Функция загрузки заказов
const fetchOrders = () => {
  fetch(`http://localhost:3001/api/orders/order/user/${userId.value}`, {
    headers: {
      "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
    }
  })
    .then(response => response.json())
    .then(data => {
      orders.value = data.map(order => {
        const customDrinkId = order.CDrink_id;
        if (customDrinkId) {
          fetchCustomDrink(customDrinkId, order);  // Загружаем кастомный напиток
        }
        return {
          ...order,
          total_price: calculateTotalPrice(order.items),
        };
      });
    })
    .catch(error => console.error("Ошибка загрузки заказов:", error));
};

// Функция загрузки информации о кастомном напитке
const fetchCustomDrink = async (customDrinkId, order) => {
  try {
    const response = await fetch(`http://localhost:3001/api/cdrink/${customDrinkId}`, {
      headers: {
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка загрузки кастомного напитка");
    }

    const data = await response.json();
    console.log("Загружен кастомный напиток:", data); // Логируем для отладки
    order.customDrink = data; // Добавляем кастомный напиток в заказ
    // Перерисовываем заказ после получения кастомного напитка
    orders.value = [...orders.value];
  } catch (error) {
    console.error("Ошибка при загрузке кастомного напитка:", error);
  }
};

// Функция для вычисления общей суммы заказа
const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
};

// Функция удаления заказа
const removeOrder = async (orderId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/orders/order/delete/${orderId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
    });

    if (!response.ok) throw new Error("Ошибка удаления заказа");

    // Обновляем список заказов после удаления
    orders.value = orders.value.filter(order => order.id !== orderId);
    console.log(`Заказ ${orderId} удалён.`);
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
  }
};

// Функция удаления товара из заказа
const removeItemFromOrder = async (itemId, orderId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/orders/orderItem/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      },
    });

    if (!response.ok) throw new Error("Ошибка удаления товара");

    // Удаляем товар из списка заказов
    const order = orders.value.find(order => order.id === orderId);
    if (order) {
      order.items = order.items.filter(item => item.id !== itemId);
      order.total_price = calculateTotalPrice(order.items); // Пересчитываем общую сумму
    }
    console.log(`Товар ${itemId} удалён из заказа ${orderId}.`);
  } catch (error) {
    console.error("Ошибка при удалении товара:", error);
  }
};

// Проверка истечения времени
const isOrderExpired = (order) => {
  const pickupTime = new Date(order.pickupTime);
  return new Date() > pickupTime;
};

// Функция изменения статуса заказа на "doing"
const markOrderAsDoing = async (orderId) => {
  try {
    const response = await fetch(`http://localhost:3001/api/orders/order/update/${orderId}`, {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: "doing" }),
});

    if (!response.ok) throw new Error("Ошибка обновления статуса заказа");

    // Обновляем статус заказа на "doing" локально
    const order = orders.value.find(order => order.id === orderId);
    if (order) {
      order.status = "doing";
    }
    console.log(`Статус заказа ${orderId} обновлен на "doing"`);
  } catch (error) {
    console.error("Ошибка при изменении статуса заказа:", error);
  }
};
</script>

<style scoped>
.orders-container {
  padding: 20px;
  max-width: 900px;
  margin: 20px auto;
  background-color: #f8f4e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order {
  background: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order h2 {
  color: #5a3e2b;
}

.order-items {
  margin-top: 10px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff7f0;
  margin-bottom: 10px;
  border-radius: 5px;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.item-info {
  margin-left: 15px;
}

.delete-order-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.delete-order-btn:hover {
  background-color: darkred;
}

.create-order-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.create-order-btn:hover {
  background-color: #45a049;
}
</style>
