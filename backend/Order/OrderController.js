import { Order, OrderItem } from './OrderModel.js';
import Product from '../Product/ProductModel.js';

// Получить все заказы
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'items' }],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Получить заказ по ID пользователя
export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Получение всех заказов по user_id с подробной информацией о продуктах
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['name', 'description', 'price', 'type', 'size', 'weight', 'filling', 'imageUrl'],
            },
          ],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

// Создать новый заказ
export const createOrder = async (req, res) => {
  try {
    const { user_id, total_price } = req.body;

    // Создаем заказ с начальным статусом "registration"
    const newOrder = await Order.create({
      user_id,
      total_price,
      status: 'registration', // Добавление статуса "registration" при создании заказа
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Обновить статус заказа
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Допустимые статусы
    const allowedStatuses = ['registration', 'doing', 'completed', 'canceled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Обновляем статус
    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
};

// Удалить заказ
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Проверка на существование заказа
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Удаление заказа
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error });
  }
};

// Получить все товары в заказах
export const getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.findAll();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};

// Получить товары по ID заказа
export const getOrderItemsByOrderId = async (req, res) => {
  try {
    const items = await OrderItem.findAll({
      where: { order_id: req.params.order_id },
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order items', error });
  }
};

// Создать товар в заказе
export const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, price } = req.body;

    // Создаем товар в заказе
    const newItem = await OrderItem.create({
      order_id,
      product_id,
      quantity,
      price,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order item', error });
  }
};

// Обновить товар в заказе
export const updateOrderItem = async (req, res) => {
  try {
    const { order_id, product_id } = req.params;
    const { quantity, price } = req.body;

    const orderItem = await OrderItem.findOne({
      where: { order_id, product_id },
    });

    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    orderItem.quantity = quantity;
    orderItem.price = price;
    await orderItem.save();

    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order item', error });
  }
};

// Удалить товар в заказе
export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Проверка на существование товара в заказе
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    // Удаление товара в заказе
    await orderItem.destroy();
    res.status(200).json({ message: 'Order item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order item', error });
  }
};
