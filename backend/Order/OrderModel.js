import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'
import User from '../User/UserModel.js'

class Order extends Model {}

Order.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		modelName: 'Order',
		tableName: 'orders',
		timestamps: false,
	}
)

class OrderItem extends Model {}

OrderItem.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		order_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		product_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'OrderItem',
		tableName: 'order_items',
		timestamps: false,
	}
)
// Один заказ принадлежит одному пользователю
Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
// Один заказ может иметь много товаров
Order.hasMany(OrderItem, {
	foreignKey: 'order_id',
	onDelete: 'CASCADE',
})

// Один товар в заказе принадлежит одному заказу
OrderItem.belongsTo(Order, {
	foreignKey: 'order_id',
	onDelete: 'CASCADE',
})
export { Order, OrderItem }
