import express from 'express'
import {
	getSubcategories,
	createSubcategory,
	updateSubcategory,
} from './SubcategoryController.js'

const SubcategoryRouter = express.Router()

SubcategoryRouter.get('/Subcategory/get', getSubcategories)
SubcategoryRouter.post('/Subcategory/create', createSubcategory)
SubcategoryRouter.put('/Subcategory/update/:id', updateSubcategory)

export default SubcategoryRouter
