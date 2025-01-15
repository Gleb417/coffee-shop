import express from 'express'
import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
} from './ProductController.js'

const ProductRouter = express.Router()

ProductRouter.get('/Product/get', getProducts)
ProductRouter.post('/Product/create', createProduct)
ProductRouter.put('/Product/update/:id', updateProduct)
ProductRouter.delete('/Product/delete/:id', deleteProduct)
ProductRouter.get('/Product/get/:id', getProductById)

export default ProductRouter
