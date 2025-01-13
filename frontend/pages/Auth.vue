<template>
  <div class="auth-container">
    <h2>{{ isLogin ? "Авторизация" : "Регистрация" }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">
        {{ isLogin ? "Войти" : "Зарегистрироваться" }}
      </button>
    </form>
    <p @click="toggleForm" class="toggle-form">
      {{
        isLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Есть аккаунт? Войдите"
      }}
    </p>
    <a href="/" class="home-button" style="padding-right: 0px">На главную</a>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const isLogin = ref(true); // Переключатель между авторизацией и регистрацией
const name = ref("");
const password = ref("");

// Функция для отправки формы
const submitForm = async () => {
  try {
    if (isLogin.value) {
      const response = await axios.post("http://localhost:3000/login", {
        name: name.value,
        password: password.value,
      });
      console.log("Авторизация успешна:", response.data);
      localStorage.setItem("token", response.data.token); // Сохранение JWT токена
    } else {
      const response = await axios.post("http://localhost:3000/users", {
        name: name.value,
        password: password.value,
      });
      console.log("Регистрация успешна:", response.data);
    }
  } catch (error) {
    console.error(
      "Ошибка при авторизации/регистрации:",
      error.response?.data || error.message
    );
  }
};

// Функция для переключения между формами
const toggleForm = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  position: relative; /* Для абсолютного позиционирования кнопки "На главную" */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #cca763;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
}

button:hover {
  background-color: #b88a4d;
}

.toggle-form {
  text-align: center;
  color: #cca763;
  cursor: pointer;
}

.toggle-form:hover {
  text-decoration: underline;
}

.home-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #cca763;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  position: relative; /* Для выравнивания с другими элементами */
}
.home-button:hover {
  background-color: #b88a4d;
}
</style>
