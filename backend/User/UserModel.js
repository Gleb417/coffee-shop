import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'
import { Order, OrderItem } from '../Order/OrderModel.js'

class User extends Model {}

User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				is: /^[0-9+\-() ]+$/i, // Проверка формата номера телефона
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('user', 'manager', 'admin'),
			allowNull: false,
			defaultValue: 'user', // Роль по умолчанию
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'users',
		timestamps: false,
		indexes: [
			{ fields: ['username'], unique: true },
			{ fields: ['email'], unique: true },
		],
	}
)
export default User
