import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		})

		res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ where: { email } })

		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)

		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			secretKey,
			{ expiresIn: '1h' }
		)

		res.json({ message: 'Login successful', token })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
