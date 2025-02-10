// routes/CdrinkRouter.js
import express from 'express';
import CdrinkController from './CDrinkController.js';

const router = express.Router();

// Получить все напитки
router.get('/all', CdrinkController.getAllCdrinks);

router.get('/:id', CdrinkController.getCdrinksbyid);

// Добавить новый напиток
router.post('/create', CdrinkController.addCdrink);

// Обновить напиток по id
router.put('/:id', CdrinkController.updateCdrink);

// Удалить напиток по id
router.delete('/:id', CdrinkController.deleteCdrink);

export default router;
