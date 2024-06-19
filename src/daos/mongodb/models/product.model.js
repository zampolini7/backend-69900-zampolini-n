import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

// Nombre de la colección en la base de datos
export const productCollectionName = 'products'

export const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: Array, default: [] },
})

productSchema.plugin(mongoosePaginate)

export const ProductModel = model(productCollectionName, productSchema)
