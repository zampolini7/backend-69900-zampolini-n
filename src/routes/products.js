import { Router } from 'express'
import { __dirname } from '../path.js'
import validarProducto from '../middleware/productValidate.js'
import * as controllers from '../controllers/products.controller.js'
const productRouter = Router()

productRouter.get('/', controllers.getAllProducts)

productRouter.get('/:pid', controllers.getProductById)

productRouter.post('/', validarProducto, controllers.createProduct)

productRouter.put('/:pid', validarProducto, controllers.updateProduct)

productRouter.delete('/:pid', controllers.deleteProduct)

productRouter.post('/insertMany', controllers.insertMany)

export default productRouter
