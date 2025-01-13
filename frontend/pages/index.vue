<template>
  <div class="home-page">
    <Header />

    <!-- Главный экран с видео фоном -->
    <section class="main-screen" data-aos="fade-up">
      <div class="main-screen__content" data-aos="fade-up" data-aos-delay="300">
        <h1>Добро пожаловать в нашу кофейню!</h1>
        <p>Лучшие сорта кофе, уютная атмосфера и невероятные десерты.</p>
      </div>
    </section>

    <!-- Продукты (напитки, десерты, закуски) -->
    <section class="product-gallery" data-aos="fade-up" data-aos-delay="600">
      <div class="container">
        <h2>Наши товары</h2>
        <div class="gallery">
          <!-- Напитки -->
          <div class="product-category" data-aos="zoom-in" data-aos-delay="600">
            <img
              src="assets/images/coffee1.jpg"
              alt="Напитки"
              class="category-image"
            />
            <div class="category-info">
              <h3>Напитки</h3>
            </div>
          </div>

          <!-- Десерты -->
          <div class="product-category" data-aos="zoom-in" data-aos-delay="800">
            <img
              src="assets/images/dessert1.jpg"
              alt="Десерты"
              class="category-image"
            />
            <div class="category-info">
              <h3>Десерты</h3>
            </div>
          </div>

          <!-- Закуски и торты -->
          <div
            class="product-category"
            data-aos="zoom-in"
            data-aos-delay="1000"
          >
            <img
              src="assets/images/cakes1.jpg"
              alt="Закуски и торты"
              class="category-image"
            />
            <div class="category-info">
              <h3>Торты</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Достижения компании -->
    <section class="achievements" data-aos="fade-up" data-aos-delay="1200">
      <div class="container">
        <h2>Наши достижения</h2>
        <div class="achievements-list">
          <div class="achievement" data-aos="flip-left" data-aos-delay="500">
            <h3>10 лет на рынке</h3>
            <p>
              Мы успешно работаем более 10 лет, предлагая лучшие сорта кофе и
              качественные десерты.
            </p>
          </div>
          <div class="achievement" data-aos="flip-left" data-aos-delay="700">
            <h3>5000 довольных клиентов</h3>
            <p>
              Более 5000 постоянных клиентов доверяют нам свои кофейные
              предпочтения.
            </p>
          </div>
          <div class="achievement" data-aos="flip-left" data-aos-delay="900">
            <h3>Лучший кофе года</h3>
            <p>
              Наши напитки были признаны лучшими на нескольких конкурсах кофе.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- О кофейне -->
    <section class="about-coffee" data-aos="fade-up" data-aos-delay="1500">
      <div class="container">
        <h2>О нашей кофейне!</h2>
        <p>
          Мы — уютное место, где каждый может насладиться ароматным кофе и
          свежими выпечками. В нашей кофейне собраны только лучшие сорта кофе,
          которые идеально подходят для всех, кто ценит вкус и атмосферу.
        </p>
        <p>
          Приятная атмосфера, качественный кофе и отличные закуски — вот что
          делает наш кофе-бар особенным. Мы гордимся тем, что можем предложить
          каждому посетителю уникальный опыт.
        </p>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css";

const router = useRouter();

const goToCalculator = () => {
  router.push("/calculator");
};

onMounted(() => {
  AOS.init({
    duration: 1000, // Время анимации
    once: true, // Анимация будет происходить только один раз
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Lora:wght@400;700&display=swap");

.home-page {
  background-color: #cca763;
  font-family: "Lora", serif; /* Шрифт для основного текста */
}
/* Главный экран с фоном */
.main-screen {
  position: relative;
  height: 70vh; /* Высота блока */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  background-image: url("https://t3.ftcdn.net/jpg/01/36/51/90/360_F_136519023_GHLiQY7LND4ylpw8XPPZH8oDYR4Vbbsi.jpg"); /* Путь к изображению фона */
  background-size: cover; /* Покрытие всего экрана */
  background-position: center; /* Центрирование изображения */
  background-repeat: no-repeat; /* Запрещаем повторение фона */
}
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* Отправляем видео на задний план */
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Стили для текста внутри блока */
.main-screen__content {
  z-index: 1; /* Текст всегда на переднем плане */
  max-width: 600px;
}
.main-screen__content h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
  font-weight: 700;
  font-family: "Dancing Script", cursive; /* Рукописный шрифт для заголовка */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Добавляем тень для контраста (обводка) */
}

.main-screen__content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  font-family: "Lora", serif; /* Для текста в блоке */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7); /* Добавляем тень для текста */
}
/* Продукты (Напитки, Десерты, Закуски) */
.product-gallery {
  padding: 50px 0;
  background-color: #f8f5eb;
  color: #4e4e4e;
  text-align: center;
}

.product-gallery h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.gallery {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Уменьшаем отступы между карточками */
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Продукты (Напитки, Десерты, Закуски) */
.product-gallery {
  padding: 50px 0;
  background-color: #f8f5eb;
  color: #4e4e4e;
  text-align: center;
}

.product-gallery h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.gallery {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Уменьшаем отступы между карточками */
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Продукты (Напитки, Десерты, Закуски) */
.product-gallery {
  padding: 50px 0;
  background-color: #f8f5eb;
  color: #4e4e4e;
  text-align: center;
}

.product-gallery h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.gallery {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Уменьшаем отступы между карточками */
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Продукты (Напитки, Десерты, Закуски) */
.product-gallery {
  padding: 50px 0;
  background-color: #f8f5eb;
  color: #4e4e4e;
  text-align: center;
}
/* Продукты */
.product-gallery h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-family: "Dancing Script", cursive; /* Шрифт для заголовков */
}
.gallery {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Уменьшаем отступы между карточками */
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Продукты (Напитки, Десерты, Закуски) */
.product-gallery {
  padding: 50px 0;
  background-color: #f8f5eb;
  color: #4e4e4e;
  text-align: center;
}

.product-gallery h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.gallery {
  display: flex;
  justify-content: space-between;
  gap: 10px; /* Уменьшаем отступы между карточками */
  flex-wrap: wrap;
  margin-top: 20px;
}

/* Категории товаров */
.product-category {
  position: relative;
  width: 32%; /* Карточки занимают чуть больше ширины, чтобы быть ближе друг к другу */
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: none; /* Убираем плавные переходы */
}
.product-category h3 {
  font-size: 1.5rem;
  font-family: "Dancing Script", cursive; /* Шрифт для названий категорий */
}

/* Резкое увеличение и тень при наведении */
.product-category:hover {
  transform: scale(1.05); /* Резкое увеличение карточки при наведении */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Добавляем тень для эффекта */
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-info {
  position: absolute;
  bottom: 10px; /* Опускаем название ниже */
  left: 50%;
  transform: translateX(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон для текста */
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
}

.category-info h3 {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Достижения */
.achievements {
  background-color: #f8f5eb;
  padding: 80px 20px;
  text-align: center;
}
.achievements h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 40px;
  font-family: "Dancing Script", cursive; /* Шрифт для заголовков достижений */
}
.achievements-list {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  flex-wrap: wrap;
}

.achievement {
  background-color: #ad8c62;
  padding: 30px;
  border-radius: 8px;
  color: white;
  width: 250px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.achievement h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  font-family: "Dancing Script", cursive;
}

.achievement p {
  font-size: 1.1rem;
  line-height: 1.5;
}

/* О кофейне */
.about-coffee {
  background-color: rgba(
    255,
    255,
    255,
    0.8
  ); /* Легкий фон, чтобы текст был читаемым */
  color: #4e4e4e;
  padding: 50px 0;
  text-align: center;
  position: relative;
}
/* О кофейне */
.about-coffee h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #c79c6e;
  font-family: "Dancing Script", cursive;
}
.about-coffee p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0 auto;
  max-width: 800px;
  font-family: "Lora", serif;
}
</style>
