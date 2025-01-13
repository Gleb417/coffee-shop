import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET || 'your_secret_key'

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res.status(401).json({ error: 'Access denied, no token provided' })
		}

		try {
			const decoded = jwt.verify(token, secretKey)
			if (!roles.includes(decoded.role)) {
				return res
					.status(403)
					.json({ error: 'Access denied, insufficient permissions' })
			}

			req.user = decoded
			next()
		} catch (error) {
			res.status(401).json({ error: 'Invalid token' })
		}
	}
}
