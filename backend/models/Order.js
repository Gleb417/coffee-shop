import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Order extends Model {
	static associate(models) {
		// Один заказ принадлежит одному пользователю
		Order.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' })
		// Один заказ может иметь много товаров
		Order.hasMany(models.OrderItem, {
			foreignKey: 'order_id',
			onDelete: 'CASCADE',
		})
	}
}

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

export default Order
