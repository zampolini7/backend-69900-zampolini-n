import express from 'express'
import { passportCall } from '../utils.js' // Ajusta la ruta según tu estructura

const router = express.Router()

router.get('/current', passportCall('current'), (req, res) => {
  if (req.user) {
    res.json({ message: 'Usuario autenticado', user: req.user })
  } else {
    res.status(401).json({ message: 'No autenticado' })
  }
})

export default router
