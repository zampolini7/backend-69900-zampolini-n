import { Schema, model } from 'mongoose'

export const cartCollectionName = 'carts'

export const cartSchema = new Schema({
  products: [
    {
      _id: false,
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, default: 1 },
    },
  ],
})

export const CartModel = model(cartCollectionName, cartSchema)
