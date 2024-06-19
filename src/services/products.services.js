import { ProductMongoDbDao } from '../daos/mongodb/models/product.dao.js'

const ProductDaoMongo = new ProductMongoDbDao()

export const getAll = async (limit, page, query, sort) => {
  try {
    const products = await ProductDaoMongo.getAll(limit, page, query, sort)
    return products
  } catch (error) {
    console.log(error)
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductDaoMongo.getById(id)
    if (!product) return false
    else return product
  } catch (error) {
    console.log(error)
  }
}

export const create = async (req, res) => {
  try {
    const { body } = req
    const newProduct = await ProductDaoMongo.create(body)
    if (!newProduct) return false
    else return newProduct
  } catch (error) {
    console.log(error)
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const updatedProduct = await ProductDaoMongo.update(id, body)
    if (!updatedProduct) return false
    else return updatedProduct
  } catch (error) {
    console.log(error)
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const removedProduct = await ProductDaoMongo.remove(id)
    if (!removedProduct) return false
    else return removedProduct
  } catch (error) {
    console.log(error)
  }
}

export const insertMany = async (products) => {
  try {
    const newProducts = await ProductDaoMongo.insertMany(products)
    if (!newProducts) return false
    else return newProducts
  } catch (error) {
    console.log(error)
  }
}
