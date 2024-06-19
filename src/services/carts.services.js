import { CartMongoDbDao } from '../daos/mongodb/cart.dao'

const cartDao = new CartMongoDbDao()

export const getAll = async (req, res) => {
  try {
    const carts = await cartDao.getAll()
    return carts
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id)
    return cart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const createCart = async () => {
  try {
    const newCart = await cartDao.create()
    return newCart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const updateCart = async (cartId, cart) => {
  try {
    const updatedCart = await cartDao.update(cartId, cart)
    res.json(updatedCart)
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const deleteCart = async (req, res) => {
  try {
    const cart = await cartDao.delete(req.params.id)
    return cart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const deleteProductFromCart = async (cartId, productId) => {
  try {
    const cart = await cartDao.deleteProductFromCart(cartId, productId)
    return cart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const deleteAllProductsFromCart = async (cartId) => {
  try {
    const cart = await cartDao.deleteAllProductsFromCart(cartId)
    return cart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}
export const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const cart = await cartDao.addProductToCart(cartId, productId, quantity)
    return cart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}

export const updateProductQuantity = async (cartId, productId, quantity) => {
  try {
    const updatedCart = await cartDao.updateProductQuantity(
      cartId,
      productId,
      quantity
    )
    return updatedCart
  } catch (error) {
    throw new Error(`Error en Service: ${error.message}`)
  }
}
