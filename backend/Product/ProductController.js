import Product from "./ProductModel.js";
import Subcategory from "../Subcategory/SubcategoryModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Определение __dirname для ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Получение всех продуктов
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Subcategory,
        attributes: ["name"],
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание нового продукта
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      type,
      size,
      weight,
      filling,
      subcategory_id,
      status,  // добавляем status в тело запроса
    } = req.body;

    // Проверка на существование подкатегории
    const subcategory = await Subcategory.findByPk(subcategory_id);
    console.log(req.file);
    if (!subcategory) {
      // Удаляем загруженный файл, если подкатегория не найдена
      if (req.file) {
        fs.unlink(
          path.join(__dirname, "..", "uploads", "product", req.file.filename),
          (err) => {
            if (err) console.error("Ошибка при удалении файла:", err);
          }
        );
      }
      return res.status(404).json({ error: "Подкатегория не найдена" });
    }

    // Путь к загруженному изображению
    const imageUrl = req.file ? `/uploads/product/${req.file.filename}` : null;

    // Если статус не передан, устанавливаем "default"
    const productStatus = status || 'default';

    // Создаем продукт в базе данных
    const product = await Product.create({
      name,
      description,
      price,
      type,
      size,
      weight,
      filling,
      imageUrl,
      subcategory_id,
      status: productStatus,  // передаем статус
    });

    res.status(201).json({ message: "Продукт успешно создан", product });
  } catch (error) {
    // Удаляем загруженный файл, если произошла ошибка
    if (req.file) {
      fs.unlink(
        path.join(__dirname, "..", "uploads", "product", req.file.filename),
        (err) => {
          if (err) console.error("Ошибка при удалении файла:", err);
        }
      );
    }
    res.status(500).json({ error: error.message });
  }
};

// Обновление продукта
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      type,
      size,
      weight,
      filling,
      imageUrl,
      subcategory_id,
      status,  // добавляем status в тело запроса для обновления
    } = req.body;

    // Проверка на существование продукта
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    // Обновление данных продукта
    product.name = name;
    product.description = description;
    product.price = price;
    product.type = type;
    product.size = size;
    product.weight = weight;
    product.filling = filling;
    product.imageUrl = imageUrl;
    product.subcategory_id = subcategory_id;
    product.status = status || product.status; // если status не передан, оставляем текущий

    await product.save();

    res.status(200).json({ message: "Продукт успешно обновлён", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление продукта
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Проверка на существование продукта
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Продукт не найден" });
    }

    // Удаление продукта
    await product.destroy();
    res.status(200).json({ message: "Продукт успешно удалён" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение продукта по ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Поиск продукта по ID
    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Subcategory,
          attributes: ["name"], // Указываем атрибуты подкатегории для выборки
        },
      ],
    });

    // Если продукт не найден, возвращаем ошибку
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Возвращаем найденный продукт
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
