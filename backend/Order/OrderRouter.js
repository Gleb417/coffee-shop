// routes/orderRoutes.js

import express from 'express'
import {
	getAllOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
	getAllOrderItems,
	getOrderItemsByOrderId,
	createOrderItem,
	updateOrderItem,
	deleteOrderItem,
} from './OrderController.js'

const orderRouter = express.Router()

// Получить все заказы
orderRouter.get('/order/get', getAllOrders)

// Получить заказ по ID
orderRouter.get('/order/get/:id', getOrderById)

// Создать новый заказ
orderRouter.post('/order/create', createOrder)

// Обновить заказ
orderRouter.put('/order/update/:id', updateOrder)

// Удалить заказ
orderRouter.delete('/order/delete/:id', deleteOrder)

// Получить все товары в заказах
orderRouter.get('/orderItem/get', getAllOrderItems)

// Получить товары по ID заказа
orderRouter.get('/orderItem/get/:order_id', getOrderItemsByOrderId)

// Создать товар в заказе
orderRouter.post('/orderItem/create', createOrderItem)

// Обновить товар в заказе
orderRouter.put('/orderItem/update/:order_id/:product_id', updateOrderItem)

// Удалить товар в заказе
orderRouter.delete('/orderItem/delete/:id', deleteOrderItem)

export default orderRouter
