<template>
  <div class="auth-container">
    <h2>{{ isLogin ? "Авторизация" : "Регистрация" }}</h2>

    <!-- Уведомление об ошибке -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Уведомление о успешной регистрации -->
    <div v-if="successMessage" class="success-message">
      <p>{{ successMessage }}</p>
      <button @click="toggleForm">Перейти к авторизации</button>
    </div>

    <!-- Форма регистрации/авторизации -->
    <form v-else @submit.prevent="submitForm">
      <div v-if="!isLogin">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div v-if="!isLogin">
        <label for="phone">Телефон:</label>
        <input type="tel" id="phone" v-model="phone" required />
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

    <a href="/" class="home-button">На главную</a>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const isLogin = ref(true);
const name = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const successMessage = ref(""); // Состояние для успешного сообщения
const errorMessage = ref(""); // Состояние для ошибок

const submitForm = async () => {
  try {
    if (isLogin.value) {
      // Авторизация по email и паролю
      const response = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email: email.value,
          password: password.value,
        }
      );
      // Успешная авторизация
      console.log("Авторизация успешна:", response.data);
      document.cookie = `token=${response.data.token}; path=/`; // Записываем токен в куки

      // Перенаправление на главную страницу
      window.location.href = "/";
    } else {
      // Регистрация пользователя
      const response = await axios.post(
        "http://localhost:3001/api/user/register",
        {
          username: name.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        }
      );
      successMessage.value = "Регистрация успешна! Пожалуйста, войдите.";
      clearForm();
    }
  } catch (error) {
    console.error(
      "Ошибка при авторизации/регистрации:",
      error.response?.data || error.message
    );
    errorMessage.value =
      error.response?.data.error || "Произошла неизвестная ошибка.";
  }
};

const clearForm = () => {
  name.value = "";
  email.value = "";
  phone.value = "";
  password.value = "";
};

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  successMessage.value = ""; // Очистить сообщение при переключении формы
  errorMessage.value = ""; // Очистить сообщение об ошибке при переключении формы
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

.success-message {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #4caf50;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 5px;
}

.success-message button {
  margin-top: 10px;
  padding: 10px;
  background-color: #cca763;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.success-message button:hover {
  background-color: #b88a4d;
}

.error-message {
  text-align: left;
  color: #f44336;
  margin-bottom: 10px;
}
</style>
