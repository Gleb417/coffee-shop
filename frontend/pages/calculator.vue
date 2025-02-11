<template>
  <div>
    <Header />
    <div class="order-container">
      <h2>Ваш заказ</h2>
      <!-- Здесь будет отображаться информация о заказе -->
      <div v-if="orderConfirmed">
        <p>{{ notification }}</p>
      </div>
      <div v-else>
        <div>
          <label for="drink">Выберите напиток:</label>
          <select v-model="selectedDrink">
            <option :value="1">Кофе</option>
            <option :value="2">Сок</option>
            <option :value="3">Чай</option>
          </select>
        </div>

        <div>
          <label for="glass">Выберите стакан:</label>
          <select v-model="selectedGlass">
            <option :value="1">Маленький</option>
            <option :value="2">Средний</option>
            <option :value="3">Большой</option>
          </select>
        </div>

        <div>
          <label for="addons">Выберите добавки:</label>
          <select v-model="selectedAddOns" multiple>
            <option :value="1">Шоколад</option>
            <option :value="2">Карамель</option>
            <option :value="3">Молоко</option>
          </select>
        </div>

        <button @click="confirmOrder">Подтвердить заказ</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie"; // Подключаем библиотеку для работы с куки

// Данные для выбора
const selectedGlass = ref(null);
const selectedDrink = ref(null);
const selectedAddOns = ref([]);
const orderConfirmed = ref(false);
const notification = ref('');

// Функция для получения user_id из токена
const getUserIdFromToken = () => {
  const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
  if (!token) {
    console.log("Токен не найден в куках");
    return null;
  }

  try {
    // Декодируем токен (предполагаем, что это JWT)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedData = JSON.parse(window.atob(base64));

    // Проверка на срок действия токена (если есть)
    const currentTime = Math.floor(Date.now() / 1000); // текущее время в секундах
    if (decodedData.exp && decodedData.exp < currentTime) {
      console.log("Токен истек");
      return null;
    }

    return decodedData.id; // Получаем id из декодированного токена
  } catch (error) {
    console.error("Ошибка при декодировании токена:", error);
    return null;
  }
};

// Подтверждение заказа и создание кастомного продукта
const confirmOrder = async () => {
  orderConfirmed.value = true;

  const userId = getUserIdFromToken();  // Получаем user_id из токена
  if (!userId) {
    notification.value = "Пользователь не найден или токен истек!";
    return;
  }

  const orderDetails = {
    name: `Кастомный ${selectedDrink.value === 1 ? 'Кофе' : selectedDrink.value === 2 ? 'Сок' : 'Чай'}`,
    description: `Вы выбрали ${selectedDrink.value === 1 ? 'Кофе' : selectedDrink.value === 2 ? 'Сок' : 'Чай'} с стаканом ${getGlassName()} и добавками: ${getAddOnsNames()}`,
    price: calculatePrice(),
    type: 'drink',
    subcategory_id: selectedDrink.value === 1 ? 2 : 1,
    size: getGlassSizeEn(),
    status: 'custom',
    user_id: userId // Добавляем user_id
  };

  try {
    const productId = await createCustomProduct(orderDetails);  // Получаем только ID
    await addProductToOrder(productId); // Передаем полученный productId
  } catch (error) {
    notification.value = `Произошла ошибка: ${error.message}`;
  }
};

// Функция для создания кастомного продукта
const createCustomProduct = async (orderDetails) => {
  try {
    const response = await fetch('http://localhost:3001/api/product/Product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании продукта');
    }

    const responseData = await response.json();
    console.log('Продукт успешно создан:', responseData);

    // Извлекаем ID продукта из ответа
    const productId = responseData.product?.id;
    if (!productId) {
      throw new Error('ID продукта не получено');
    }

    notification.value = 'Товар успешно создан!';
    return productId;  // Возвращаем только ID продукта
  } catch (error) {
    console.error('Ошибка:', error);
    notification.value = 'Произошла ошибка при создании товара';
    throw error;  // Прокидываем ошибку для обработки в confirmOrder
  }
};

// Функция для добавления товара в заказ
const addProductToOrder = async (productId) => {
  const userId = getUserIdFromToken();  // Получаем user_id из токена
  if (!userId) {
    notification.value = "Пользователь не найден!";
    return;
  }

  try {
    // 1. Получаем все заказы пользователя
    const ordersResponse = await fetch(`http://localhost:3001/api/orders/order/user/${userId}`);
    const orders = await ordersResponse.json();

    // 2. Если заказ существует, добавляем в него товар
    if (orders.length > 0) {
      const orderId = orders[0].id;  // Используем ID первого заказа

      // 3. Добавляем товар в заказ
      const addProductResponse = await fetch('http://localhost:3001/api/orders/orderItem/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,  // ID существующего заказа
          product_id: productId,  // Передаем product_id
          quantity: 1,  // Количество товара
          price: calculatePrice(),  // Цена товара
        }),
      });

      if (!addProductResponse.ok) {
        throw new Error('Ошибка при добавлении товара в заказ');
      }

      const addProductData = await addProductResponse.json();
      console.log('Продукт добавлен в заказ:', addProductData);
      notification.value = 'Товар успешно добавлен в заказ!';
    } else {
      // 4. Если заказа нет, создаем новый заказ
      const createOrderResponse = await fetch('http://localhost:3001/api/orders/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,  // user_id
          total_price: "100",  // Сумма заказа (можно динамически вычислять)
        }),
      });

      if (!createOrderResponse.ok) {
        throw new Error('Ошибка при создании заказа');
      }

      const createOrderData = await createOrderResponse.json();
      console.log('Новый заказ создан:', createOrderData);

      // 5. После создания нового заказа добавляем товар в него
      await addProductToOrder(productId);  // Рекурсивно добавляем товар в новый заказ
    }
  } catch (error) {
    console.error('Ошибка:', error);
    notification.value = 'Произошла ошибка при обработке заказа';
  }
};

// Функции для получения имени стакана, добавок и других данных
const getGlassName = () => {
  switch (selectedGlass.value) {
    case 1: return "Маленький";
    case 2: return "Средний";
    case 3: return "Большой";
    default: return "";
  }
};

const getAddOnsNames = () => {
  const addOns = {
    1: 'Шоколад',
    2: 'Карамель',
    3: 'Молоко'
  };
  return selectedAddOns.value.map(id => addOns[id]).join(', ');
};

const getGlassSizeEn = () => {
  switch (selectedGlass.value) {
    case 1: return 'small';
    case 2: return 'medium';
    case 3: return 'large';
    default: return '';
  }
};

const calculatePrice = () => {
  let basePrice = 5; // Базовая цена
  if (selectedGlass.value === 2) basePrice += 1; // Средний стакан
  if (selectedGlass.value === 3) basePrice += 2; // Большой стакан
  if (selectedAddOns.value.length > 0) basePrice += selectedAddOns.value.length * 0.5; // Цена за добавки
  return basePrice;
};

// Инициализация AOS для анимаций
onMounted(() => {
  AOS.init();
});
</script>


<style scoped>
/* Стили для страницы заказа */
.order-container {
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

select {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

button:focus {
  outline: none;
}

.notification {
  color: #4CAF50;
  font-weight: bold;
}

.notification-error {
  color: red;
  font-weight: bold;
}
</style>
