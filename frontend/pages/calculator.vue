<template>
  <div class="calculator-page">
    <Header />

    <!-- Основной контейнер калькулятора -->
    <section class="calculator-container" data-aos="fade-up">
      <div class="container">
        <h1>Соберите свой заказ</h1>

        <!-- Шаг 1: Выбор стакана -->
        <div class="step">
          <h2>Выберите стакан</h2>
          <div class="glass-options">
            <div
              v-for="glass in glasses"
              :key="glass.id"
              class="glass-option"
              :class="{
                active: selectedGlass === glass.id,
                disabled: orderConfirmed,
              }"
              @click="selectGlass(glass.id)"
              :aria-disabled="orderConfirmed ? 'true' : 'false'"
            >
              <img :src="glass.image" :alt="glass.name" />
              <p>{{ glass.name }}</p>
            </div>
          </div>
        </div>

        <!-- Шаг 2: Выбор напитка -->
        <div class="step" v-if="selectedGlass">
          <h2>Выберите напиток</h2>
          <div class="drink-options">
            <div
              v-for="drink in drinks"
              :key="drink.id"
              class="drink-option"
              :class="{
                active: selectedDrink === drink.id,
                disabled: orderConfirmed,
              }"
              @click="selectDrink(drink.id)"
              :aria-disabled="orderConfirmed ? 'true' : 'false'"
            >
              <img :src="drink.image" :alt="drink.name" />
              <p>{{ drink.name }}</p>
            </div>
          </div>
        </div>

        <!-- Шаг 3: Меню для выбора чая или сока -->
        <div
          v-if="selectedDrink && (selectedDrink === 2 || selectedDrink === 3)"
          class="step"
        >
          <h2>Выберите разновидность</h2>
          <div v-if="selectedDrink === 2" class="drink-varieties">
            <div
              v-for="juice in juices"
              :key="juice.id"
              class="drink-variety-option"
              :class="{
                active: selectedJuice === juice.id,
                disabled: orderConfirmed,
              }"
              @click="selectJuice(juice.id)"
            >
              <img :src="juice.image" :alt="juice.name" />
              <p>{{ juice.name }}</p>
            </div>
          </div>
          <div v-if="selectedDrink === 3" class="drink-varieties">
            <div
              v-for="tea in teas"
              :key="tea.id"
              class="drink-variety-option"
              :class="{
                active: selectedTea === tea.id,
                disabled: orderConfirmed,
              }"
              @click="selectTea(tea.id)"
            >
              <img :src="tea.image" :alt="tea.name" />
              <p>{{ tea.name }}</p>
            </div>
          </div>
        </div>

        <!-- Шаг 3: Меню для выбора кофе -->
        <div v-if="selectedDrink === 1" class="step">
          <h2>Выберите кофе</h2>
          <div class="drink-varieties">
            <div
              v-for="coffee in coffeeTypes"
              :key="coffee.id"
              class="drink-variety-option"
              :class="{
                active: selectedCoffee === coffee.id,
                disabled: orderConfirmed,
              }"
              @click="selectCoffee(coffee.id)"
            >
              <img :src="coffee.image" :alt="coffee.name" />
              <p>{{ coffee.name }}</p>
            </div>
          </div>
        </div>

        <!-- Шаг 4: С собой или в кофейне -->
        <div
          class="step"
          v-if="
            selectedDrink && (selectedJuice || selectedTea || selectedCoffee)
          "
        >
          <h2>Хотите с собой или в кофейне?</h2>
          <div class="options">
            <button
              :class="{ active: isToGo }"
              @click="selectOption('toGo')"
              :disabled="orderConfirmed"
            >
              С собой
            </button>
            <button
              :class="{ active: !isToGo }"
              @click="selectOption('inCafe')"
              :disabled="orderConfirmed"
            >
              В кофейне
            </button>
          </div>
        </div>

        <!-- Шаг 5: Добавки -->
        <div class="step" v-if="isToGo !== null">
          <h2>Выберите добавки</h2>
          <div class="add-ons">
            <div
              v-for="addon in addOns"
              :key="addon.id"
              class="addon-option"
              :class="{
                active: selectedAddOns.includes(addon.id),
                disabled: orderConfirmed,
              }"
              @click="toggleAddOn(addon.id)"
            >
              <p>{{ addon.name }}</p>
            </div>
          </div>
        </div>

        <!-- Шаг 6: Подтверждение заказа -->
        <div class="step" v-if="selectedAddOns.length > 0 || isToGo !== null">
          <button
            class="confirm-button"
            @click="confirmOrder"
            :disabled="orderConfirmed"
          >
            Сделать заказ
          </button>
        </div>
      </div>
    </section>

    <!-- Анимация заказа (пакет или стол) -->
    <div v-if="orderConfirmed" class="order-animation">
      <div class="order-content">
        <img v-if="isToGo" src="assets/images/package.png" alt="Пакет" />
        <div v-else class="order-table">Ваш заказ на столе</div>
        <div class="order-details">
          <h3>Ваш заказ:</h3>
          <p>Стакан: {{ selectedGlassName }}</p>
          <p>Напиток: {{ selectedDrinkName }}</p>
          <p v-if="selectedCoffee">Тип кофе: {{ selectedCoffeeName }}</p>
          <p v-if="selectedJuice">Вид сока: {{ selectedJuiceName }}</p>
          <p v-if="selectedTea">Вид чая: {{ selectedTeaName }}</p>
          <p>Добавки: {{ selectedAddOnsNames.join(", ") }}</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import small from "@/assets/images/small.png";
import medium from "@/assets/images/medium.png";
import large from "@/assets/images/large.png";
import juice from "@/assets/images/j.png";
import tea from "@/assets/images/tea.png";
import coffe from "@/assets/images/coffee1.jpg";

// Стаканы
const glasses = [
  { id: 1, name: "Маленький стакан", image: small },
  { id: 2, name: "Средний стакан", image: medium },
  { id: 3, name: "Большой стакан", image: large },
];

// Напитки
const drinks = [
  { id: 1, name: "Кофе", image: coffe },
  { id: 2, name: "Сок", image: juice },
  { id: 3, name: "Чай", image: tea },
];

// Виды кофе
const coffeeTypes = [
  { id: 1, name: "Эспрессо", image: "assets/images/espresso.jpg" },
  { id: 2, name: "Латте", image: "assets/images/latte.jpg" },
  { id: 3, name: "Капучино", image: "assets/images/cappuccino.jpg" },
];

// Виды соков
const juices = [
  { id: 1, name: "Апельсиновый", image: "assets/images/orange-juice.jpg" },
  { id: 2, name: "Яблочный", image: "assets/images/apple-juice.jpg" },
  { id: 3, name: "Гранатовый", image: "assets/images/pomegranate-juice.jpg" },
];

// Виды чая
const teas = [
  { id: 1, name: "Черный", image: "assets/images/black-tea.jpg" },
  { id: 2, name: "Зеленый", image: "assets/images/green-tea.jpg" },
];

// Добавки
const addOns = [
  { id: 1, name: "Молоко", image: "" },
  { id: 2, name: "Сироп", image: "" },
  { id: 3, name: "Шоколад", image: "" },
];

const selectedGlass = ref(null);
const selectedDrink = ref(null);
const selectedCoffee = ref(null);
const selectedJuice = ref(null);
const selectedTea = ref(null);
const isToGo = ref(null);
const selectedAddOns = ref([]);
const orderConfirmed = ref(false);

// Выбор стакана
const selectGlass = (id) => {
  if (!orderConfirmed.value) selectedGlass.value = id;
};

// Выбор напитка
const selectDrink = (id) => {
  if (!orderConfirmed.value) {
    selectedDrink.value = id;
    selectedCoffee.value = null; // сбрасываем кофе
    selectedJuice.value = null; // сбрасываем сок
    selectedTea.value = null; // сбрасываем чай
  }
};

// Выбор кофе
const selectCoffee = (id) => {
  if (!orderConfirmed.value) selectedCoffee.value = id;
};

// Выбор сока
const selectJuice = (id) => {
  if (!orderConfirmed.value) selectedJuice.value = id;
};

// Выбор чая
const selectTea = (id) => {
  if (!orderConfirmed.value) selectedTea.value = id;
};

// Выбор упаковки (с собой или в кофейне)
const selectOption = (option) => {
  if (!orderConfirmed.value) isToGo.value = option === "toGo";
};

// Добавление/удаление добавок
const toggleAddOn = (id) => {
  if (!orderConfirmed.value) {
    if (selectedAddOns.value.includes(id)) {
      selectedAddOns.value = selectedAddOns.value.filter(
        (addon) => addon !== id
      );
    } else {
      selectedAddOns.value.push(id);
    }
  }
};

// Подтверждение заказа
const confirmOrder = () => {
  orderConfirmed.value = true;
};

// Выбранные варианты (стакан, напиток, добавки)
const selectedGlassName = computed(() => {
  const glass = glasses.find((g) => g.id === selectedGlass.value);
  return glass ? glass.name : "";
});

const selectedDrinkName = computed(() => {
  const drink = drinks.find((d) => d.id === selectedDrink.value);
  return drink ? drink.name : "";
});

const selectedCoffeeName = computed(() => {
  const coffee = coffeeTypes.find((c) => c.id === selectedCoffee.value);
  return coffee ? coffee.name : "";
});

const selectedJuiceName = computed(() => {
  const juice = juices.find((j) => j.id === selectedJuice.value);
  return juice ? juice.name : "";
});

const selectedTeaName = computed(() => {
  const tea = teas.find((t) => t.id === selectedTea.value);
  return tea ? tea.name : "";
});

const selectedAddOnsNames = computed(() => {
  return selectedAddOns.value
    .map((id) => {
      const addon = addOns.find((a) => a.id === id);
      return addon ? addon.name : "";
    })
    .filter(Boolean);
});

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Lora:wght@400;700&display=swap");

.calculator-page {
  font-family: "Lora", serif;
  background-color: #f8f5eb;
  padding-bottom: 40px;
}

h1 {
  text-align: center;
  font-family: "Dancing Script", cursive;
  font-size: 3rem;
}

.step {
  padding: 40px 0;
  text-align: center;
}

.glass-options,
.drink-options,
.add-ons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.glass-option,
.drink-option,
.addon-option {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.glass-option img,
.drink-option img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.glass-option p,
.drink-option p,
.addon-option p {
  margin-top: 10px;
  font-size: 1.1rem;
}

.glass-option.active,
.drink-option.active,
.addon-option.active {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.options button {
  padding: 10px 20px;
  font-size: 1.2rem;
  margin: 0 10px;
  background-color: #cca763;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.options button.active {
  background-color: #ad8c62;
}

.confirm-button {
  padding: 15px 30px;
  background-color: #cca763;
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #ad8c62;
}
/* Добавляем стиль для заблокированных элементов */
.glass-option.disabled,
.drink-option.disabled,
.addon-option.disabled,
.options button:disabled,
.confirm-button:disabled {
  opacity: 0.5; /* Снижаем яркость */
  cursor: not-allowed; /* Убираем курсор */
}
.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Анимация для заказа */
.order-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.order-content img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}

.order-table {
  font-size: 1.5rem;
  color: #cca763;
}

.order-details {
  margin-top: 20px;
}

.order-details h3 {
  font-size: 1.5rem;
  font-weight: bold;
}

.order-details p {
  font-size: 1.2rem;
}
/* Центрирование всех вариантов напитков */
.drink-varieties {
  display: flex;
  justify-content: center; /* Выравнивание по горизонтали */
  align-items: center; /* Выравнивание по вертикали */
  flex-wrap: wrap;
  gap: 20px; /* Расстояние между элементами */
}

/* Обычные стили для вариантов напитков */
.drink-variety-option {
  cursor: pointer;
  opacity: 1;
  transition: transform 0.3s ease;
}

.drink-variety-option.active {
  border: 2px solid #007bff;
  background-color: #e7f1ff;
  transform: scale(1.05); /* Легкое увеличение при выборе */
}

.drink-variety-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Заголовки шагов */
.step h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}
</style>
