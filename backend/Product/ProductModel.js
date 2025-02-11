// models/ProductModel.js
import { DataTypes, DATE, Model } from 'sequelize'
import sequelize from '../config/database.js'
import Subcategory from '../Subcategory/SubcategoryModel.js'

class Product extends Model {}

Product.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM('drink', 'cake', 'dessert'),
			allowNull: false,
		},
		size: {
			type: DataTypes.ENUM('small', 'medium', 'large'),
			allowNull: true, // Только для напитков
		},
		weight: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: true, // Для тортов и десертов
		},
		filling: {
			type: DataTypes.STRING,
			allowNull: true, // Только для тортов и десертов
		},
		imageUrl: {
			type: DataTypes.STRING,
			allowNull: true, // Ссылка на изображение товара
		},
		subcategory_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Subcategory,
				key: 'id',
			},
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		status: {
			type: DataTypes.ENUM('default', 'custom'),
			allowNull: false,
			defaultValue: 'default',  // добавлено значение по умолчанию
		  }
	},
	{
		sequelize,
		modelName: 'Product',
		tableName: 'products',
		timestamps: false,
	}
)

Product.belongsTo(Subcategory, { foreignKey: 'subcategory_id' })
Subcategory.hasMany(Product, { foreignKey: 'subcategory_id' })

export default Product
