<template>
  <div class="calculator-page">
    <Header />

    <section class="calculator-container" data-aos="fade-up">
      <div class="container">
        <h1>Соберите свой напиток</h1>

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
  saveOrderToCart();
  // Перенаправление в корзину
  setTimeout(() => {
    window.location.href = "/cart"; // Перенаправляем на страницу корзины
  }, 500);
};

// Сохранение заказа в корзину
const saveOrderToCart = () => {
  const order = {
    glass: selectedGlass.value,
    drink: selectedDrink.value,
    coffee: selectedCoffee.value,
    juice: selectedJuice.value,
    tea: selectedTea.value,
    option: isToGo.value,
    addOns: selectedAddOns.value,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(order);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Метод для возврата на главную
const goHome = () => {
  window.location.href = "/"; // Переход на главную страницу
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
  background-color: #fff;
  font-family: "Lora", serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 50px;
}

.step {
  margin-bottom: 30px;
}

.step h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.glass-options,
.drink-options,
.drink-varieties {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.glass-option,
.drink-option,
.drink-variety-option,
.addon-option {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.glass-option.active,
.drink-option.active,
.drink-variety-option.active,
.addon-option.active {
  transform: scale(1.1);
}

.glass-option img,
.drink-option img,
.drink-variety-option img {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.return-home {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.return-home button {
  font-size: 16px;
  padding: 10px 20px;
  background-color: #f39c12;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.return-home button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.confirm-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #e74c3c;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.order-content {
  text-align: center;
  margin: 20px;
}

.order-details p {
  margin: 10px 0;
}

.options {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.options button {
  padding: 10px 20px;
  background-color: #2980b9;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
}

.options button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-ons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

footer {
  margin-top: 40px;
}
</style>
