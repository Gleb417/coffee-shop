<template>
  <div class="about">
    <Header />

    <!-- Краткая сводка -->
    <section class="summary" data-aos="fade-up">
      <div class="container">
        <h2>О нашей кофейне</h2>
        <p>
          Добро пожаловать в нашу кофейню! Мы создаем уникальные моменты для
          каждого гостя, предлагая не просто кофе, а настоящий опыт. Каждый
          сезон мы обновляем меню, чтобы удивить вас новыми вкусами и ароматами
          — от освежающих весенних коктейлей и летних напитков до согревающих
          осенних и зимних шедевров. Мы следим за мировыми трендами, предлагая
          как классические напитки, так и авторские разработки, которые нельзя
          найти больше нигде. Наши бариста и повара используют только отборные
          ингредиенты и создают каждый напиток с любовью и вниманием к деталям.
          Приходите, чтобы насладиться атмосферой уюта, вдохновения и тепла в
          каждый сезон!
        </p>
      </div>
    </section>

    <!-- Фотографии сотрудников -->
    <section class="team-photos" data-aos="fade-up" data-aos-delay="200">
      <div class="container">
        <h2>Моменты с нами</h2>
        <div class="team-gallery">
          <img
            src="assets/images/our.jpg"
            alt="Сотрудник 1"
            class="team-photo"
            data-aos="zoom-in"
          />
          <img
            src="assets/images/our2.jpg"
            alt="Сотрудник 2"
            class="team-photo"
            data-aos="zoom-in"
            data-aos-delay="100"
          />
          <img
            src="assets/images/our3.jpg"
            alt="Сотрудник 3"
            class="team-photo"
            data-aos="zoom-in"
            data-aos-delay="200"
          />
        </div>
      </div>
    </section>

    <!-- Информация о сотрудниках -->
    <section class="team-info" data-aos="fade-up" data-aos-delay="400">
      <div class="container">
        <h2>Наши сотрудники</h2>
        <div class="team-members">
          <div class="member" data-aos="fade-up" data-aos-delay="100">
            <img src="assets/images/employee1.jpg" alt="Сотрудник 1" />
            <p>Мария Иванова — Бариста</p>
          </div>
          <div class="member" data-aos="fade-up" data-aos-delay="200">
            <img src="assets/images/employee2.jpg" alt="Сотрудник 2" />
            <p>Алексей Смирнов — Менеджер</p>
          </div>
          <div class="member" data-aos="fade-up" data-aos-delay="300">
            <img src="assets/images/employee3.jpg" alt="Сотрудник 3" />
            <p>Мария Петрова — Кондитер</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Компании-партнеры -->
    <section class="partners" data-aos="fade-up" data-aos-delay="500">
      <div class="container">
        <h2>Наши партнеры</h2>
        <div class="partners-logos">
          <img
            src="assets/images/partner1.png"
            alt="Партнер 1"
            class="partner-logo"
            data-aos="fade-up"
            data-aos-delay="100"
          />
          <img
            src="assets/images/partner2.png"
            alt="Партнер 2"
            class="partner-logo"
            data-aos="fade-up"
            data-aos-delay="200"
          />
          <img
            src="assets/images/partner3.png"
            alt="Партнер 3"
            class="partner-logo"
            data-aos="fade-up"
            data-aos-delay="300"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

// Инициализация AOS только на клиентской стороне
onMounted(() => {
  if (process.client) {
    import("aos").then((AOS) => {
      AOS.default.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
      });
    });
  }
});
</script>

<style scoped>
.about-page {
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Краткая сводка */
.summary {
  background-color: #f8f5eb;
  padding: 40px 0;
  text-align: center;
}

.summary h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 20px;
}

.summary p {
  font-size: 1.2rem;
  color: #4e4e4e;
  line-height: 1.6;
}

/* Фотографии сотрудников */
.team-photos {
  background-color: #e2e2e2;
  padding: 40px 0;
  text-align: center;
}

.team-photos h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 20px;
}

.team-gallery {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.team-photo {
  width: 30%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.team-photo:hover {
  transform: scale(1.05);
}

/* Информация о сотрудниках */
.team-info {
  padding: 40px 0;
  background-color: #f8f5eb;
  text-align: center;
}

.team-info h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 20px;
}

.team-members {
  display: flex;
  justify-content: space-around;
  gap: 30px;
}

.member {
  text-align: center;
}

.member img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.member p {
  font-size: 1.2rem;
  color: #4e4e4e;
}

/* Компании-партнеры */
.partners {
  background-color: #f8f5eb;
  padding: 40px 0;
  text-align: center;
}

.partners h2 {
  font-size: 2.5rem;
  color: #c79c6e;
  margin-bottom: 20px;
}

.partners-logos {
  display: flex;
  justify-content: space-around;
  gap: 30px;
}

.partner-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.partner-logo:hover {
  transform: scale(1.1);
}
</style>
