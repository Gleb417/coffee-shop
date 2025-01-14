// models/CategoryModel.js
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Category extends Model {}

Category.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Category',
		tableName: 'categories',
		timestamps: false,
		indexes: [{ fields: ['name'], unique: true }],
	}
)

export default Category
