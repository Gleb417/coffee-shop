import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import sequelize from './config/database.js'
import orderRouter from './Order/OrderRouter.js'
import UserRouter from './User/UserRouter.js'
import CategoryRouter from './Category/CategoryRouter.js'
import SubcategoryRouter from './Subcategory/SubcategoryRouter.js'
import ProductRouter from './Product/ProductRouter.js'
dotenv.config()

const app = express()
app.use(cors())

app.use(express.json())
app.use(bodyParser.json()) // Для обработки JSON-запросов
// Подключение маршрутов
app.use('/api/user', UserRouter)
app.use('/api/orders', orderRouter)
app.use('/api/categories', CategoryRouter)
app.use('/api/subcategory', SubcategoryRouter)
app.use('/api/product', ProductRouter)
// Настройка связей между моделями
sequelize
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
