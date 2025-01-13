import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const db = {}

// Чтение всех файлов моделей в папке models, кроме index.js
fs.readdirSync(__dirname)
	.filter(file => file.endsWith('.js') && file !== 'index.js')
	.forEach(file => {
		const model = require(path.join(__dirname, file)).default(
			sequelize,
			DataTypes
		)
		db[model.name] = model
	})

// Установка ассоциаций между моделями, если они определены
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
