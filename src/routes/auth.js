import express from 'express'
import jwt from 'jsonwebtoken'
import { passportCall } from '../utils.js'

const router = express.Router()

// Ruta de login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (email === 'admin@example.com' && password === '123') {
    const token = jwt.sign({ email }, 's3cr3t', {
      expiresIn: '5m',
    })
    res.cookie('access_token', token, { maxAge: 100000, httpOnly: true })
    res.json({ message: 'Login exitoso' })
  } else {
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
  }
})

router.get('/verify', passportCall('jwt'), (req, res) => {
  res.json({ message: 'Token válido', user: req.user })
})

export default router
