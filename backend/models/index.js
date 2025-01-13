import sequelize from '../config/database.js'
import { Sequelize, DataTypes } from 'sequelize'

// Импортируем модели
import User from './User.js'
import Order from './Order.js'
import OrderItem from './OrderItem.js'

const db = {}

// Инициализируем Sequelize и добавляем в объект db
db.Sequelize = Sequelize
db.sequelize = sequelize

// Инициализация моделей
db.User = User // Без вызова конструктора, просто присваиваем модель
db.Order = Order
db.OrderItem = OrderItem

// Настройка связей между моделями
db.User.hasMany(db.Order, { foreignKey: 'user_id', onDelete: 'CASCADE' })
db.Order.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' })
db.OrderItem.belongsTo(db.Order, {
	foreignKey: 'order_id',
	onDelete: 'CASCADE',
})

export default db
