import express from 'express'
import {
	getSubcategories,
	createSubcategory,
	updateSubcategory,
	deleteSubcategory,
} from './SubcategoryController.js'

const SubcategoryRouter = express.Router()

SubcategoryRouter.get('/Subcategory/get', getSubcategories)
SubcategoryRouter.post('/Subcategory/create', createSubcategory)
SubcategoryRouter.put('/Subcategory/update/:id', updateSubcategory)
SubcategoryRouter.delete('/Subcategory/delete/:id', deleteSubcategory)

export default SubcategoryRouter
