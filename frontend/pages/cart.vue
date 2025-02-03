<template>
  <div class="cart-page">
    <Header />

    <h1>Корзина</h1>

    <!-- Плашка с уведомлением о том, что заказ был добавлен через калькулятор -->
    <div v-if="addedFromCalculator" class="calculator-notification">
      <p>Этот заказ был добавлен через калькулятор напитков.</p>
    </div>

    <!-- Отдельный блок для заказов из калькулятора -->
    <div v-if="calculatorCart.length" class="calculator-order-card">
      <h2>Ваш заказ из калькулятора</h2>
      <div class="order-items">
        <div v-for="(item, index) in calculatorCart" :key="index" class="item-card">
          <img :src="item.imageUrl" :alt="item.name" class="item-image" />
          <div class="item-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p>Цена: {{ item.price }} ₽</p>
            <p>Количество: {{ item.quantity }}</p>
            <button @click="removeFromCalculatorCart(index)" class="cancel-btn">
              Удалить
            </button>
          </div>
        </div>
      </div>
      <p class="order-total">Общая сумма: <strong>{{ totalCalculatorPrice }} ₽</strong></p>
      <button @click="checkoutFromCalculator" class="checkout-btn">Оформить заказ из калькулятора</button>
    </div>

    <!-- Обычные товары из корзины -->
    <div v-if="cart.length" class="orders">
      <div class="order-card">
        <h2>Ваш заказ</h2>
        <p class="order-total">
          Общая сумма: <strong>{{ totalPrice }} ₽</strong>
        </p>
        <div class="order-items">
          <div v-for="(item, index) in cart" :key="index" class="item-card">
            <img :src="item.imageUrl" :alt="item.name" class="item-image" />
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <p>Цена: {{ item.price }} ₽</p>
              <p>Количество: {{ item.quantity }}</p>
              <button @click="removeFromCart(index)" class="cancel-btn">
                Удалить
              </button>
            </div>
          </div>
        </div>
        <button @click="checkout" class="checkout-btn">Оформить заказ</button>
      </div>
    </div>

    <div v-else>
      <p>Ваша корзина пуста.</p>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import { ref, computed, onMounted } from "vue";

const cart = ref([]);  // Основная корзина
const calculatorCart = ref([]);  // Корзина из калькулятора
const addedFromCalculator = ref(false);  // Флаг, если заказ из калькулятора

onMounted(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.value = storedCart;
  
  const storedCalculatorCart = JSON.parse(localStorage.getItem("calculatorCart")) || [];
  calculatorCart.value = storedCalculatorCart;

  // Проверка флага, если заказ был добавлен из калькулятора
  const isAddedFromCalculator = localStorage.getItem("addedFromCalculator");
  if (isAddedFromCalculator) {
    addedFromCalculator.value = true;
    localStorage.removeItem("addedFromCalculator");
  }
});

// Удаление товара из обычной корзины
const removeFromCart = (index) => {
  cart.value.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

// Удаление товара из корзины калькулятора
const removeFromCalculatorCart = (index) => {
  calculatorCart.value.splice(index, 1);
  localStorage.setItem("calculatorCart", JSON.stringify(calculatorCart.value));
};

// Подсчет общей суммы обычной корзины
const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Подсчет общей суммы корзины из калькулятора
const totalCalculatorPrice = computed(() =>
  calculatorCart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Оформление заказа из обычной корзины
const checkout = () => {
  alert("Заказ оформлен!");
  localStorage.removeItem("cart");
  cart.value = [];
};

// Оформление заказа из корзины калькулятора
const checkoutFromCalculator = () => {
  alert("Заказ из калькулятора оформлен!");
  localStorage.removeItem("calculatorCart");
  calculatorCart.value = [];
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

.orders, .calculator-order-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card, .calculator-order-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-card h2, .calculator-order-card h2 {
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

.checkout-btn {
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 15px;
}

.checkout-btn:hover {
  background-color: #ff5722;
}

/* Стиль для плашки с уведомлением */
.calculator-notification {
  background-color: #ffeb3b;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #3e2b1d;
}
</style>
