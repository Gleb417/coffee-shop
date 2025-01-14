import express from 'express'
import {
	getProducts,
	createProduct,
	updateProduct,
} from './ProductController.js'

const ProductRouter = express.Router()

ProductRouter.get('/Product/get', getProducts)
ProductRouter.post('/Product/create', createProduct)
ProductRouter.put('/Product/update/:id', updateProduct)

export default ProductRouter
