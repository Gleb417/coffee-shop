import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './UserModel.js'

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

// Получить всех пользователей
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll()
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Получить пользователя по ID
export const getUserById = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findByPk(id)

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Удаление пользователя
export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params

		// Проверка на существование пользователя
		const user = await User.findByPk(id)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		// Удаление пользователя
		await user.destroy()
		res.status(200).json({ message: 'Пользователь успешно удален' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
