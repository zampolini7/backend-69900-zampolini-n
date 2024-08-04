import { Router } from 'express'
import { __dirname } from '../path.js'
import validarUsuario from '../middleware/userValidate.js'
import * as controllers from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/', controllers.getAllUsers)
userRouter.get('/:id', controllers.getUserById)
userRouter.post('/', validarUsuario, controllers.createUser)
userRouter.put('/:id', validarUsuario, controllers.updateUser)
userRouter.delete('/:id', controllers.deleteUser)

export default userRouter
