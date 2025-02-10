// controllers/CdrinkController.js
import Cdrink from './CDrinkModel.js';

// Получить все напитки
const getAllCdrinks = async (req, res) => {
  try {
    const drinks = await Cdrink.findAll();
    res.json(drinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Добавить новый напиток
const addCdrink = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    const newDrink = await Cdrink.create({ name, price, description, imageUrl });
    res.status(201).json(newDrink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Обновить напиток
const updateCdrink = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, imageUrl } = req.body;

  try {
    const drink = await Cdrink.findByPk(id);
    if (!drink) return res.status(404).json({ message: 'Drink not found' });

    drink.name = name || drink.name;
    drink.price = price || drink.price;
    drink.description = description || drink.description;
    drink.imageUrl = imageUrl || drink.imageUrl;

    await drink.save();
    res.json(drink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Удалить напиток
const deleteCdrink = async (req, res) => {
  const { id } = req.params;

  try {
    const drink = await Cdrink.findByPk(id);
    if (!drink) return res.status(404).json({ message: 'Drink not found' });

    await drink.destroy();
    res.json({ message: 'Drink deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};
// Получить кастомный напиток по ID
const getCdrinksbyid = async (req, res) => {
    const { id } = req.params; // Получаем ID из параметров запроса
  
    try {
      const drink = await Cdrink.findByPk(id); // Находим напиток по ID
      if (!drink) {
        return res.status(404).json({ message: 'Drink not found' }); // Если напиток не найден
      }
  
      res.json(drink); // Возвращаем информацию о напитке
    } catch (error) {
      res.status(500).json({ message: error.message }); // Обработка ошибок
    }
  };
  

export default {
  getAllCdrinks,
  addCdrink,
  updateCdrink,
  deleteCdrink,
  getCdrinksbyid,
};
