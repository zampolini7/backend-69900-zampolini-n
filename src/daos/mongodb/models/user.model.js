import { Schema, model } from 'mongoose'

export const userCollectionName = 'users'

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'user' },
  cart: { type: Schema.Types.ObjectId, ref: 'carts', required: true },
  password: { type: String, required: true },
})

export const UserModel = model(userCollectionName, userSchema)
