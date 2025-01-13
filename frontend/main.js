import { createApp } from 'vue';
import App from './app.vue';
import router from './router';  // Импортируем маршруты

// Создаем приложение и подключаем Vue Router
createApp(App)
  .use(router)  // Подключаем Vue Router
  .mount('#app');  // Монтируем приложение в элемент с id="app"
