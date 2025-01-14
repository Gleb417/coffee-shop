import express from 'express'
import {
	register,
	login,
	getAllUsers,
	getUserById,
	deleteUser,
} from './UserController.js'

const UserRouter = express.Router()

UserRouter.post('/register', register)
UserRouter.post('/login', login)
UserRouter.get('/users', getAllUsers) // Новый маршрут для получения всех пользователей
UserRouter.get('/users/:id', getUserById) // Новый маршрут для получения пользователя по ID
UserRouter.delete('/users/delete/:id', deleteUser)

export default UserRouter
