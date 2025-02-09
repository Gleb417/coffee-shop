<template>
  <div>
    <Header />

    <!-- Корзина -->
    <div v-if="cartItems.length > 0" class="cart-content">
      <h1>Ваша корзина</h1>

      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
          <img :src="`http://localhost:3001${item.product.imageUrl}`" :alt="item.product.name" class="cart-item-image" />
          <div class="cart-item-info">
            <h3>{{ item.product.name }}</h3>
            <p>Цена: {{ item.product.price }} ₽</p>
            <p>Количество: {{ item.quantity }}</p>
            <button @click="removeItemFromCart(item.product.id)">Удалить</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <p>Общая сумма: {{ totalPrice }} ₽</p>
        <button class="checkout-btn">Перейти к оформлению</button>
      </div>
    </div>

    <!-- Если корзина пуста -->
    <div v-else>
      <p>Ваша корзина пуста.</p>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

const cartItems = ref([]);
const orderId = ref(localStorage.getItem("orderId"));

// Загружаем товары в корзину при монтировании компонента
onMounted(() => {
  if (orderId.value) {
    fetch(`http://localhost:3001/api/orders/${orderId.value}/items`, {
      headers: {
        "Authorization": `Bearer ${document.cookie.split("token=")[1]}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        cartItems.value = data; // Сохраняем данные о товарах в корзине
      })
      .catch(error => console.error("Ошибка загрузки товаров из корзины:", error));
  }
});

// Удаление товара из корзины
const removeItemFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.product.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
};

// Общая сумма корзины
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
});
</script>


<style scoped>
.cart-content {
  padding: 20px;
  background-color: #f8f4e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.cart-item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.cart-item-info {
  margin-left: 20px;
  flex-grow: 1;
}

.cart-item h3 {
  font-size: 1.2rem;
  color: #5a3e2b;
  font-weight: bold;
}

.cart-item p {
  font-size: 1rem;
  color: #7a5a47;
  margin-bottom: 8px;
}

.cart-summary {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff7f50;
}

.checkout-btn {
  background-color: #ff7f50;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
}

.checkout-btn:hover {
  background-color: #ff5722;
}
</style>
