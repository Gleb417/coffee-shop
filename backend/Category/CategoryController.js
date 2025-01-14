// backend/Category/CategoryController.js
import Category from './CategoryModel.js'

// Получение всех категорий
export const getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll()
		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Создание новой категории
export const createCategory = async (req, res) => {
	try {
		const { name } = req.body

		// Проверка на существование категории с таким именем
		const existingCategory = await Category.findOne({ where: { name } })
		if (existingCategory) {
			return res
				.status(409)
				.json({ error: 'Категория с таким именем уже существует' })
		}

		const category = await Category.create({ name })
		res.status(201).json({ message: 'Категория успешно создана', category })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Обновление категории
export const updateCategory = async (req, res) => {
	try {
		const { id } = req.params
		const { name } = req.body

		// Проверка на существование категории
		const category = await Category.findByPk(id)
		if (!category) {
			return res.status(404).json({ error: 'Категория не найдена' })
		}

		// Обновление данных категории
		category.name = name
		await category.save()

		res.status(200).json({ message: 'Категория успешно обновлена', category })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
