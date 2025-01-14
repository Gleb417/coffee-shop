// backend/Subcategory/SubcategoryController.js
import Subcategory from './SubcategoryModel.js'
import Category from '../Category/CategoryModel.js'

// Получение всех подкатегорий
export const getSubcategories = async (req, res) => {
	try {
		const subcategories = await Subcategory.findAll({
			include: [{ model: Category, attributes: ['name'] }],
		})
		res.status(200).json(subcategories)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Создание новой подкатегории
export const createSubcategory = async (req, res) => {
	try {
		const { name, category_id } = req.body

		// Проверка на существование подкатегории с таким именем
		const existingSubcategory = await Subcategory.findOne({ where: { name } })
		if (existingSubcategory) {
			return res
				.status(409)
				.json({ error: 'Подкатегория с таким именем уже существует' })
		}

		// Проверка на существование категории
		const category = await Category.findByPk(category_id)
		if (!category) {
			return res.status(404).json({ error: 'Категория с таким ID не найдена' })
		}

		const subcategory = await Subcategory.create({ name, category_id })
		res
			.status(201)
			.json({ message: 'Подкатегория успешно создана', subcategory })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Обновление подкатегории
export const updateSubcategory = async (req, res) => {
	try {
		const { id } = req.params
		const { name, category_id } = req.body

		// Проверка на существование подкатегории
		const subcategory = await Subcategory.findByPk(id)
		if (!subcategory) {
			return res.status(404).json({ error: 'Подкатегория не найдена' })
		}

		// Проверка на существование категории, если передан новый category_id
		if (category_id) {
			const category = await Category.findByPk(category_id)
			if (!category) {
				return res
					.status(404)
					.json({ error: 'Категория с таким ID не найдена' })
			}
			subcategory.category_id = category_id
		}

		// Обновление данных подкатегории
		subcategory.name = name || subcategory.name
		await subcategory.save()

		res
			.status(200)
			.json({ message: 'Подкатегория успешно обновлена', subcategory })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
