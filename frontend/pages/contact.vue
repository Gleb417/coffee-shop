<template>
  <div class="contact-page">
    <Header />

    <!-- Основной блок с контактной информацией -->
    <section class="contact-info" data-aos="fade-up">
      <div class="container">
        <h1>Контакты</h1>
        <p>Мы всегда рады помочь! Свяжитесь с нами удобным способом.</p>

        <div class="contact-details">
          <!-- Адрес -->
          <div class="contact-item">
            <h3>Адрес:</h3>
            <p>ул. Кофейная, 12, Москва, Россия</p>
          </div>

          <!-- Телефон -->
          <div class="contact-item">
            <h3>Телефон:</h3>
            <p>+7 (123) 456-78-90</p>
          </div>

          <!-- Email -->
          <div class="contact-item">
            <h3>Email:</h3>
            <p>info@coffeeshop.ru</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма обратной связи -->
    <section class="contact-form" data-aos="fade-up" data-aos-delay="400">
      <div class="container">
        <h2>Свяжитесь с нами</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Ваше имя</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              placeholder="Введите ваше имя"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Ваш email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              placeholder="Введите ваш email"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="Ваше сообщение"
              required
            ></textarea>
          </div>

          <button type="submit">Отправить</button>
        </form>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = () => {
  // Логика отправки формы
  alert(`Сообщение от ${form.value.name} отправлено!`);
};

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Lora:wght@400;700&display=swap");

.contact-page {
  background-color: #f8f5eb;
  font-family: "Lora", serif;
  padding-bottom: 40px;
}

/* Заголовок страницы */
.contact-info {
  padding: 50px 0;
  text-align: center;
}

.contact-info h1 {
  font-size: 3rem;
  font-family: "Dancing Script", cursive;
  margin-bottom: 20px;
}

.contact-info p {
  font-size: 1.2rem;
  margin-bottom: 40px;
  color: #4e4e4e;
}

/* Контактная информация */
.contact-details {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
}

.contact-item {
  width: 250px;
  text-align: left;
  background-color: #ad8c62;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-item h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-family: "Dancing Script", cursive;
}

/* Форма */
.contact-form {
  background-color: #f8f5eb;
  padding: 50px 0;
  text-align: center;
}

.contact-form h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 30px;
  font-family: "Dancing Script", cursive;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
}

.form-group label {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-family: "Lora", serif;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-group button {
  padding: 15px 30px;
  background-color: #cca763;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-group button:hover {
  background-color: #ad8c62;
}

/* Карта */
.map {
  padding: 50px 0;
  text-align: center;
}

.map-container {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}
</style>
