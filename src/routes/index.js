import { Router } from 'express'
import productRouter from './products.js'
import cartRouter from './carts.js'
import viewsRouter from './views.js'

const router = Router()

router.use('/products', productRouter)
router.use('/carts', cartRouter)

export default router
