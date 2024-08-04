import express from 'express'
import router from './routes/index.js'
import handlebars from 'express-handlebars'
import { __dirname } from './path.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.js'
import dotenv from 'dotenv'
import { initMongoDb } from './db/database.js'
import errorHandler from './middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import { initializePassport } from './config/passport.config.js'
import passport from 'passport'

const app = express()

dotenv.config()

// Configuración de middleware
app.use(cookieParser()) // Debe estar antes de passport.initialize()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Inicializa Passport
initializePassport()

app.use(passport.initialize())

// Rutas y otros middlewares
app.use('/api', router)
app.use('/', viewsRouter)
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)

// Configura Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

const PORT = process.env.PORT || 8080

const http = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

initMongoDb()

export const socketServer = new Server(http)
socketServer.on('connection', (socket) => {
  console.log('Nueva conexión: ' + socket.id)
})
