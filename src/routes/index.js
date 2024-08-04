import { Router } from 'express'
import productRouter from './products.js'
import cartRouter from './carts.js'
import userRouter from './users.js'
import authRoutes from './auth.js'
import sessionsRouter from './sessions.js'

const router = Router()

router.use('/products', productRouter)
router.use('/carts', cartRouter)
router.use('/users', userRouter)
router.use('/auth', authRoutes)
router.use('/sessions', sessionsRouter)

export default router
