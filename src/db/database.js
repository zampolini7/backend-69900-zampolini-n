import dotenv from 'dotenv'
import mongoose from 'mongoose'

export const initMongoDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_CONECT)
    console.log('Se ha conectado a la db')
  } catch (error) {
    console.log(error)
  }
}
