import dotenv from 'dotenv'
import mongoose from 'mongoose'

export const initMongoDb = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_CONECT ||
        'mongodb+srv://zampolini7:4LeQ99HBstPuWSpA@cluster0.kbyg3hr.mongodb.net/'
    )
    console.log('Se ha conectado a la db')
  } catch (error) {
    console.log(error)
  }
}
