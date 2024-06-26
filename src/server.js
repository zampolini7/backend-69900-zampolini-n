import express from 'express'
import router from './routes/index.js'
import handlebars from 'express-handlebars'
import { __dirname } from './path.js'
import { Server } from 'socket.io'
import viewsRouter from './routes/views.js'
import dotenv from 'dotenv'
import { initMongoDb } from './db/database.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use(errorHandler)
dotenv.config()

const PORT = process.env.PORT || 8080

const http = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

initMongoDb()

export const socketServer = new Server(http)
socketServer.on('connection', (socket) => {
  console.log('nueva conection' + socket.id)
})

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)
