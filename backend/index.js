import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./config/database.js";
import CDrinkRouter from "./CDrink/CDrinkRouter.js";
import orderRouter from "./Order/OrderRouter.js";
import UserRouter from "./User/UserRouter.js";
import CategoryRouter from "./Category/CategoryRouter.js";
import SubcategoryRouter from "./Subcategory/SubcategoryRouter.js";
import ProductRouter from "./Product/ProductRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const app = express();

// Определяем __dirname для ES-модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Разрешаем CORS
app.use(cors({ origin: "http://localhost:3000" }));

// Обработка JSON
app.use(express.json());
app.use(bodyParser.json());

// Подключение маршрутов
app.use("/api/user", UserRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/subcategory", SubcategoryRouter);
app.use("/api/product", ProductRouter);
app.use ("/api/cdrink", CDrinkRouter);

// **Настройка раздачи изображений**
const uploadPath = path.join(__dirname, "uploads", "product");

// Проверяем, существует ли папка `uploads/product`, и если нет, создаем её
if (!fs.existsSync(uploadPath)) {
  console.error("❌ Папка с изображениями не найдена. Создаю...");
  fs.mkdirSync(uploadPath, { recursive: true });
} else {
  console.log("✅ Статические файлы раздаются из:", uploadPath);
}

// Устанавливаем права доступа (если требуется)
fs.chmodSync(uploadPath, 0o755); // Доступ для чтения/записи

// Раздаем файлы из `uploads/product`
app.use("/uploads/product", express.static(uploadPath));

// **Запуск сервера после синхронизации с БД**
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ База данных синхронизирована.");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Ошибка при синхронизации базы данных:", error);
  });
