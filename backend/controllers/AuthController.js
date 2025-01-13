import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const register = async (req, res) => {
	try {
		const { username, email, password, role, phone } = req.body

		// Проверка существования пользователя с таким email
		const existingUserByEmail = await User.findOne({ where: { email } })
		if (existingUserByEmail) {
			return res
				.status(409)
				.json({ error: 'Пользователь с таким email уже существует' })
		}

		// Проверка существования пользователя с таким username
		const existingUserByUsername = await User.findOne({ where: { username } })
		if (existingUserByUsername) {
			return res
				.status(409)
				.json({ error: 'Пользователь с таким username уже существует' })
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание нового пользователя
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
			role,
			phone,
		})

		res.status(201).json({ message: 'Пользователь успешно зарегестрирован' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(401).json({ error: 'Неверный логин' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Неверный пароль' })
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			secretKey,
			{ expiresIn: '1h' }
		)

		res.json({ message: 'Успешная авторизация', token })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
