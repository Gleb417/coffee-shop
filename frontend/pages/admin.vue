<template>
  <div class="admin-panel">
    <Header />
    <div class="admin-content">
      <h1>Панель администратора</h1>

      <div class="accordion">
        <!-- Секция "Просмотр и удаление товаров" -->
        <div class="accordion-item">
          <button class="accordion-header" @click="toggleSection('viewProducts')">
            Просмотр и удаление товаров
          </button>
          <div class="accordion-body" v-show="activeAccordion === 'viewProducts'">
            <ul class="product-list">
              <li v-for="product in products" :key="product.id" class="product-item">
                <p><strong>{{ product.name }}</strong> – {{ product.price }} ₽</p>
                <div class="action-buttons">
                  <button @click="deleteProduct(product.id)">Удалить товар</button>
                  <button @click="goToProduct(product.id)">Перейти к товару</button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Секция "Просмотр заказов" -->
        <div class="accordion-item">
          <button class="accordion-header" @click="toggleSection('viewOrders')">
            Просмотр заказов
          </button>
          <div class="accordion-body" v-show="activeAccordion === 'viewOrders'">
            <ul class="order-list">
              <li v-for="order in orders" :key="order.id" class="order-item">
                <p>Заказ №{{ order.id }} – Дата: {{ order.created_at }}</p>
                <table class="order-items-table">
                  <thead>
                    <tr>
                      <th>Название товара</th>
                      <th>Цена за штуку</th>
                      <th>Количество</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.items" :key="item.product_id">
                      <td>{{ getProductName(item.product_id) }}</td>
                      <td>{{ getProductPrice(item.product_id) }} ₽</td>
                      <td>{{ item.quantity }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- Добавляем общую сумму заказа -->
                <p><strong>Общая сумма заказа: {{ getTotalOrderPrice(order.items) }} ₽</strong></p>
              </li>
            </ul>
          </div>
        </div>

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

const router = useRouter();

// Массивы для хранения списка товаров и заказов
const products = ref([]);
const orders = ref([]);
const subcategories = ref([]);

// Объект для нового товара
const newProduct = ref({
  name: "",
  description: "",
  price: 0,
  type: "торт",
  weight: 0,
  subcategory_id: null,
  image: ""
});

// Переменная для хранения активной секции аккордеона
const activeAccordion = ref("");

// Карта категорий и их подкатегорий
const categoryMap = {
  торт: ["Шоколадный", "Фруктовый", "Сливочный"],
  десерт: ["Эклер", "Макарун", "Пирожное"],
  напиток: ["Чай", "Кофе", "Сок"]
};

// Функция для переключения секций аккордеона
const toggleSection = (section) => {
  activeAccordion.value = activeAccordion.value === section ? "" : section;
};

// Функция для обновления подкатегорий на основе выбранного типа
const updateSubcategories = () => {
  subcategories.value = categoryMap[newProduct.value.type] || [];
  newProduct.value.subcategory_id = subcategories.value[0]?.id || "";
};

// Функция получения списка товаров с сервера
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/product/Product/get");
    if (!res.ok) {
      console.error("Ошибка получения товаров");
      return;
    }
    products.value = await res.json();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция получения всех заказов с сервера (для админа)
const fetchOrders = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/orders/order/get");
    if (!res.ok) {
      console.error("Ошибка получения заказов");
      return;
    }
    orders.value = await res.json();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция получения подкатегорий с сервера
const fetchSubcategories = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/subcategory/Subcategory/get");
    if (!res.ok) {
      console.error("Ошибка получения подкатегорий");
      return;
    }
    subcategories.value = await res.json();
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция создания нового товара
const addProduct = async () => {
  try {
    const res = await fetch("http://localhost:3001/api/product/Product/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct.value)
    });
    if (!res.ok) {
      console.error("Ошибка при создании товара");
      return;
    }
    console.log("Новый товар успешно создан");
    // После успешного создания обновляем список товаров
    await fetchProducts();
    // Сбрасываем форму
    newProduct.value = {
      name: "",
      description: "",
      price: 0,
      type: "торт",
      weight: 0,
      subcategory_id: null,
      image: ""
    };
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция удаления товара
const deleteProduct = async (productId) => {
  try {
    const res = await fetch(`http://localhost:3001/api/product/Product/delete/${productId}`, {
      method: "DELETE"
    });
    if (!res.ok) {
      console.error("Ошибка удаления товара");
      return;
    }
    await fetchProducts();
    console.log(`Товар с id ${productId} удалён из базы данных`);
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция перехода на страницу товара
const goToProduct = (productId) => {
  window.location.href = `http://localhost:3000/ProductDetail?id=${productId}`;
};

// Функция для получения названия товара по его id
const getProductName = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.name : "Не найдено";
};

// Функция для получения цены товара по его id
const getProductPrice = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  return product ? product.price : 0;
};

// Функция для расчета общей стоимости заказа
const getTotalOrderPrice = (orderItems) => {
  return orderItems.reduce((total, item) => {
    const productPrice = getProductPrice(item.product_id); // Получаем цену товара
    return total + (productPrice * item.quantity); // Умножаем на количество и добавляем к общей сумме
  }, 0).toFixed(2); // Округляем до 2 знаков после запятой
};

// Монтируем компонент и загружаем данные
onMounted(() => {
  fetchSubcategories();
  fetchProducts();
  fetchOrders();
});
</script>

<style scoped>
/* Стили для страницы */
.admin-panel {
  padding: 20px;
  background-color: #f4f4f4;
}

.admin-content {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accordion-item {
  margin-bottom: 10px;
}

.accordion-header {
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 4px;
}

.accordion-body {
  padding: 10px;
  border: 1px solid #007bff;
  border-top: none;
}

.form-group {
  margin-bottom: 10px;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.product-list, .order-list {
  list-style: none;
  padding: 0;
}

.product-item, .order-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

.action-buttons button {
  margin-right: 10px;
}
</style>
