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
                  <p>
                    <strong>{{ product.name }}</strong> – {{ product.price }} ₽
                  </p>
                  <button @click="deleteProduct(product.id)">Удалить товар</button>
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
  import Header from "~/components/Header.vue";
  import Footer from "~/components/Footer.vue";
  
  const products = ref([]);
  
  // Переменная для активной секции аккордеона
  const activeAccordion = ref("");
  
  // Функция для переключения секций аккордеона
  function toggleSection(section) {
    activeAccordion.value = activeAccordion.value === section ? "" : section;
  }
  
  onMounted(() => {
    fetchProducts();
  });
  
  // Функция получения списка товаров
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
  
  // Функция удаления товара, которая отправляет DELETE-запрос на сервер
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/product/Product/delete/${productId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        console.error("Ошибка удаления товара");
        return;
      }
      // После успешного удаления обновляем список товаров
      await fetchProducts();
      console.log(`Товар с id ${productId} удалён из базы данных`);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
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
  
  .product-list {
    list-style-type: none;
    padding: 0;
  }
  
  .product-item {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  