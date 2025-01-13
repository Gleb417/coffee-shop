import express from 'express'
import authRoutes from './routes/authRoutes.js'
import sequelize from './config/database.js'

const app = express()

app.use(express.json())

// Подключение маршрутов
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3001

// Синхронизация базы данных и запуск сервера
sequelize
	.sync()
	.then(() => {
		console.log('Синхронизация прошла успешно')
		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту ${PORT}`)
		})
	})
	.catch(error => {
		console.error('Error connecting to the database', error)
	})
