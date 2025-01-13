import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class OrderItem extends Model {
	static associate(models) {
		// Один товар в заказе принадлежит одному заказу
		OrderItem.belongsTo(models.Order, {
			foreignKey: 'order_id',
			onDelete: 'CASCADE',
		})
	}
}

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

export default OrderItem
