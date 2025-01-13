import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import sequelize from './config/database.js'
import db from './models/index.js'

dotenv.config()

const app = express()

app.use(express.json())

// Подключение маршрутов
app.use('/auth', authRoutes)

// Настройка связей между моделями
db.sequelize
	.sync({ alter: true })
	.then(() => {
		console.log('Синхронизация базы данных прошла успешно')

		// Запуск сервера
		app.listen(process.env.PORT || 3001, () => {
			console.log(`Сервер запущен на порту ${process.env.PORT || 3001}`)
		})
	})
	.catch(error => {
		console.error('Ошибка при синхронизации базы данных:', error)
	})
