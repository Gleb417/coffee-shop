import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import sequelize from "./config/database.js";
import orderRouter from "./Order/OrderRouter.js";
import UserRouter from "./User/UserRouter.js";
import CategoryRouter from "./Category/CategoryRouter.js";
import SubcategoryRouter from "./Subcategory/SubcategoryRouter.js";
import ProductRouter from "./Product/ProductRouter.js";
import path from "path"; // Импорт для работы с путями
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Укажите здесь адрес вашего фронтенда
  })
);

app.use(express.json());
app.use(bodyParser.json()); // Для обработки JSON-запросов
// Подключение маршрутов
app.use("/api/user", UserRouter);
app.use("/api/orders", orderRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/subcategory", SubcategoryRouter);
app.use("/api/product", ProductRouter);

const __dirname = path.resolve(); // Определяем текущую директорию
app.use(
  "/uploads/product",
  express.static(path.join(__dirname, "..", "uploads", "product"))
);

// Настройка связей между моделями
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Синхронизация базы данных прошла успешно");

    // Запуск сервера
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Сервер запущен на порту ${process.env.PORT || 3001}`);
    });
  })
  .catch((error) => {
    console.error("Ошибка при синхронизации базы данных:", error);
  });
