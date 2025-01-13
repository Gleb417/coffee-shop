// controllers/OrderController.js

import { Order, OrderItem } from './OrderModel.js'

// Получить все заказы
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			include: [{ model: OrderItem, as: 'items' }],
		})
		res.status(200).json(orders)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching orders', error })
	}
}

// Получить заказ по ID
export const getOrderById = async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.id, {
			include: [{ model: OrderItem, as: 'items' }],
		})

		if (!order) {
			return res.status(404).json({ message: 'Order not found' })
		}

		res.status(200).json(order)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching order', error })
	}
}

// Создать новый заказ
export const createOrder = async (req, res) => {
	try {
		const { user_id, total_price } = req.body

		// Создаем заказ
		const newOrder = await Order.create({
			user_id,
			total_price,
		})

		res.status(201).json(newOrder)
	} catch (error) {
		res.status(500).json({ message: 'Error creating order', error })
	}
}

// Обновить заказ
export const updateOrder = async (req, res) => {
	try {
		const { id } = req.params
		const { total_price } = req.body

		const order = await Order.findByPk(id)
		if (!order) {
			return res.status(404).json({ message: 'Order not found' })
		}

		order.total_price = total_price
		await order.save()

		res.status(200).json(order)
	} catch (error) {
		res.status(500).json({ message: 'Error updating order', error })
	}
}

// Получить все товары в заказах
export const getAllOrderItems = async (req, res) => {
	try {
		const items = await OrderItem.findAll()
		res.status(200).json(items)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching order items', error })
	}
}

// Получить товары по ID заказа
export const getOrderItemsByOrderId = async (req, res) => {
	try {
		const items = await OrderItem.findAll({
			where: { order_id: req.params.order_id },
		})
		res.status(200).json(items)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching order items', error })
	}
}

// Создать товар в заказе
export const createOrderItem = async (req, res) => {
	try {
		const { order_id, product_id, quantity, price } = req.body

		// Создаем товар в заказе
		const newItem = await OrderItem.create({
			order_id,
			product_id,
			quantity,
			price,
		})

		res.status(201).json(newItem)
	} catch (error) {
		res.status(500).json({ message: 'Error creating order item', error })
	}
}

// Обновить товар в заказе
export const updateOrderItem = async (req, res) => {
	try {
		const { order_id, product_id } = req.params
		const { quantity, price } = req.body

		const orderItem = await OrderItem.findOne({
			where: { order_id, product_id },
		})

		if (!orderItem) {
			return res.status(404).json({ message: 'Order item not found' })
		}

		orderItem.quantity = quantity
		orderItem.price = price
		await orderItem.save()

		res.status(200).json(orderItem)
	} catch (error) {
		res.status(500).json({ message: 'Error updating order item', error })
	}
}
