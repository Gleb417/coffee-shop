import express from 'express'
import { register, login } from './UserController.js'

const UserRouter = express.Router()

UserRouter.post('/register', register)
UserRouter.post('/login', login)

export default UserRouter
