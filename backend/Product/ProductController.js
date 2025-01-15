// backend/Product/ProductController.js
import Product from './ProductModel.js'
import Subcategory from '../Subcategory/SubcategoryModel.js'

// Получение всех продуктов
export const getProducts = async (req, res) => {
	try {
		const products = await Product.findAll({
			include: {
				model: Subcategory,
				attributes: ['name'],
			},
		})
		res.status(200).json(products)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Создание нового продукта
export const createProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			type,
			size,
			weight,
			filling,
			imageUrl,
			subcategory_id,
		} = req.body

		// Проверка на существование подкатегории
		const subcategory = await Subcategory.findByPk(subcategory_id)
		if (!subcategory) {
			return res.status(404).json({ error: 'Подкатегория не найдена' })
		}

		const product = await Product.create({
			name,
			description,
			price,
			type,
			size,
			weight,
			filling,
			imageUrl,
			subcategory_id,
		})
		res.status(201).json({ message: 'Продукт успешно создан', product })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Обновление продукта
export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const {
			name,
			description,
			price,
			type,
			size,
			weight,
			filling,
			imageUrl,
			subcategory_id,
		} = req.body

		// Проверка на существование продукта
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ error: 'Продукт не найден' })
		}

		// Обновление данных продукта
		product.name = name
		product.description = description
		product.price = price
		product.type = type
		product.size = size
		product.weight = weight
		product.filling = filling
		product.imageUrl = imageUrl
		product.subcategory_id = subcategory_id
		await product.save()

		res.status(200).json({ message: 'Продукт успешно обновлён', product })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// Удаление продукта
export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params

		// Проверка на существование продукта
		const product = await Product.findByPk(id)
		if (!product) {
			return res.status(404).json({ error: 'Продукт не найден' })
		}

		// Удаление продукта
		await product.destroy()
		res.status(200).json({ message: 'Продукт успешно удалён' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getProductById = async (req, res) => {
	try {
		const productId = req.params.id

		// Поиск продукта по ID
		const product = await Product.findByPk(productId, {
			include: [
				{
					model: Subcategory,
					attributes: ['name'], // Указываем атрибуты подкатегории для выборки
				},
			],
		})

		// Если продукт не найден, возвращаем ошибку
		if (!product) {
			return res.status(404).json({ message: 'Product not found' })
		}

		// Возвращаем найденный продукт
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching product', error })
	}
}
