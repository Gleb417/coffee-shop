import express from 'express'
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from './ProductController.js'

const ProductRouter = express.Router()

ProductRouter.get('/Product/get', getProducts)
ProductRouter.post('/Product/create', createProduct)
ProductRouter.put('/Product/update/:id', updateProduct)
ProductRouter.delete('/Product/delete/:id', deleteProduct)

export default ProductRouter
