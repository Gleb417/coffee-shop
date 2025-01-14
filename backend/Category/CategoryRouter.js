import express from 'express'
import {
	getCategories,
	createCategory,
	updateCategory,
	deleteCategory,
} from './CategoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.get('/Category/get', getCategories)
CategoryRouter.post('/Category/create', createCategory)
CategoryRouter.put('/Category/update/:id', updateCategory)
CategoryRouter.delete('/Category/delete/:id', deleteCategory)

export default CategoryRouter
