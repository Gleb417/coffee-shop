// models/SubcategoryModel.js
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'
import Category from '../Category/CategoryModel.js'

class Subcategory extends Model {}

Subcategory.init(
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Category,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Subcategory',
		tableName: 'subcategories',
		timestamps: false,
		indexes: [{ fields: ['name'], unique: true }],
	}
)

Subcategory.belongsTo(Category, { foreignKey: 'category_id' })
Category.hasMany(Subcategory, { foreignKey: 'category_id' })

export default Subcategory
