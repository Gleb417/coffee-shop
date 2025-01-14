import express from 'express'
import {
	getCategories,
	createCategory,
	updateCategory,
} from './CategoryController.js'

const CategoryRouter = express.Router()

CategoryRouter.get('/Category/get', getCategories)
CategoryRouter.post('/Category/create', createCategory)
CategoryRouter.put('/Category/update/:id', updateCategory)

export default CategoryRouter
