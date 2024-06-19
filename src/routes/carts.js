import { Router } from 'express'
import * as cartController from '../controllers/cart.controller.js'

const cartRouter = Router()

cartRouter.get('/', cartController.getAllCarts)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/', cartController.createCart)
cartRouter.post('/:cid/products/:pid', cartController.addProductToCart)
cartRouter.delete('/:cid/products/:pid', cartController.deleteProductFromCart)
cartRouter.put('/:cid', cartController.updateCart) //
cartRouter.put('/:cid/products/:pid', cartController.updateProductQuantity)
cartRouter.delete('/:cid', cartController.deleteAllProductsFromCart)

export default cartRouter
