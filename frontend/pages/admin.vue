<template>
  <div class="admin-panel">
    <Header />
    <div class="admin-content">
      <h1>Панель администратора</h1>
      
      <div class="accordion">
        <!-- Секция "Создание нового товара" -->
        <div class="accordion-item">
          <button class="accordion-header" @click="toggleSection('createProduct')">
            Создание нового товара
          </button>
          <div class="accordion-body" v-show="activeAccordion === 'createProduct'">
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <label for="name">Название товара:</label>
                <input type="text" id="name" v-model="newProduct.name" required />
              </div>
              <div class="form-group">
                <label for="description">Описание товара:</label>
                <textarea id="description" v-model="newProduct.description" required></textarea>
              </div>
              <div class="form-group">
                <label for="price">Цена (₽):</label>
                <input type="number" id="price" v-model.number="newProduct.price" required />
              </div>
              <div class="form-group">
                <label for="type">Тип:</label>
                <input type="text" id="type" v-model="newProduct.type" required />
              </div>
              <div class="form-group">
                <label for="size">Размер:</label>
                <input type="text" id="size" v-model="newProduct.size" required />
              </div>
              <div class="form-group">
                <label for="weight">Вес (г):</label>
                <input type="number" id="weight" v-model.number="newProduct.weight" required />
              </div>
              <div class="form-group">
                <label for="subcategory_id">Подкатегория ID:</label>
                <input type="number" id="subcategory_id" v-model.number="newProduct.subcategory_id" required />
              </div>
              <div class="form-group">
                <label for="imageUrl">URL изображения:</label>
                <input type="text" id="imageUrl" v-model="newProduct.imageUrl" />
              </div>
              <button type="submit">Создать товар</button>
            </form>
          </div>
        </div>

        <!-- Секция "Просмотр и удаление товаров" -->
        <div class="accordion-item">
          <button class="accordion-header" @click="toggleSection('viewProducts')">
            Просмотр и удаление товаров
          </button>
          <div class="accordion-body" v-show="activeAccordion === 'viewProducts'">
            <ul class="product-list">
              <li v-for="product in products" :key="product.id" class="product-item">
                <p>
                  <strong>{{ product.name }}</strong> – {{ product.price }} ₽
                </p>
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
                <div v-if="order.items && order.items.length">
                  <table class="order-items-table">
                    <thead>
                      <tr>
                        <th>Название товара</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Сумма</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Здесь предполагается, что каждый элемент заказа имеет поля productId и quantity -->
                      <tr v-for="item in order.items" :key="item.productId">
                        <td>{{ getProductName(item.productId) }}</td>
                        <td>{{ getProductPrice(item.productId) }} ₽</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ (getProductPrice(item.productId) * item.quantity).toFixed(2) }} ₽</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else>
                  <p>Нет товаров в заказе</p>
                </div>
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

// Объект для нового товара (создание)
const newProduct = ref({
  name: "",
  description: "",
  price: 0,
  type: "",
  size: "",
  weight: 0,
  subcategory_id: 0,
  imageUrl: ""
});

// Переменная для хранения активной секции аккордеона
const activeAccordion = ref("");

// Функция для переключения секций аккордеона
function toggleSection(section) {
  activeAccordion.value = activeAccordion.value === section ? "" : section;
}

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

// Функция получения списка заказов с сервера
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

// Функция создания нового товара – отправляет POST-запрос на сервер
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
      type: "",
      size: "",
      weight: 0,
      subcategory_id: 0,
      imageUrl: ""
    };
  } catch (error) {
    console.error("Ошибка:", error);
  }
};

// Функция удаления товара – отправляет DELETE-запрос на сервер
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
  router.push({ name: "ProductDetail", query: { id: productId } });
};

// Функция для получения названия товара по его id из массива products
function getProductName(productId) {
  const product = products.value.find(p => p.id === productId);
  return product ? product.name : "Неизвестно";
}

// Функция для получения цены товара по его id из массива products
function getProductPrice(productId) {
  const product = products.value.find(p => p.id === productId);
  return product ? product.price : 0;
}

onMounted(() => {
  fetchProducts();
  fetchOrders();
});
</script>

<style scoped>
.admin-panel {
  padding: 20px;
  background-color: #f4f4f4;
}

.admin-content {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.accordion {
  margin-top: 20px;
}

.accordion-item {
  margin-bottom: 10px;
}

.accordion-header {
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  text-align: left;
  padding: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 4px;
}

.accordion-header:hover {
  background-color: #0056b3;
}

.accordion-body {
  padding: 10px;
  border: 1px solid #007bff;
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.product-list,
.order-list {
  list-style-type: none;
  padding: 0;
}

.product-item,
.order-item {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.order-items-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.order-items-table th,
.order-items-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.order-items-table th {
  background-color: #f2f2f2;
}
</style>
