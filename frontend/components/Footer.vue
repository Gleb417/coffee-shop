<template>
  <footer>
    <div class="footer-content">
      <div class="footer-info">
        <h3>Справочная информация</h3>
        <ul>
          <li><a href="/about">О нас</a></li>
          <li><a href="/contact">Контакты</a></li>
          <li><a href="/privacy-policy">Политика конфиденциальности</a></li>
          <li><a href="/terms-of-service">Условия использования</a></li>
        </ul>
      </div>

      <div class="footer-contact">
        <h3>Контакты</h3>
        <ul>
          <li>Адрес: ул. 30 Лет Победы. д68</li>
          <li>Телефон: +7 (982) 82-50-4-80</li>
          <li>Email: info@coffee-shop.ru</li>
        </ul>
      </div>

      <div class="footer-social">
        <h3>Мы в соцсетях</h3>
        <ul>
          <li>Telegram: @CFshope.47</li>
          <li>VK: Vk.Coffegroup.ru</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2025 Coffee shoppi. Все права защищены(воозможно).</p>
    </div>
  </footer>
</template>

<script setup>
import { defineComponent } from "vue";
</script>

<style scoped>
footer {
  background-color: #3e2b1d;
  color: white;
  padding: 20px 0;
  font-size: 0.9rem;
  text-align: left;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 40px;
  flex-wrap: wrap;
}

.footer-info,
.footer-contact,
.footer-social {
  width: 30%;
  min-width: 250px;
}

.footer-info h3,
.footer-contact h3,
.footer-social h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #c79c6e;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 8px;
}

ul li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

ul li a:hover {
  color: #c79c6e;
}

.footer-bottom {
  text-align: center;
  margin-top: 20px;
  font-size: 1rem;
}

.footer-bottom p {
  margin: 0;
}
</style>
