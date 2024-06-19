import * as service from '../services/carts.services.js'

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await service.getAll()
    res.status(200).send(carts)
  } catch (error) {
    next(error)
  }
}
export const getCartById = async (req, res, next) => {
  try {
    const id = req.params.cid
    const cart = await service.getCartById(id)
    res.status(200).send(cart)
  } catch (error) {
    next(error)
  }
}

export const createCart = async (req, res, next) => {
  try {
    const newCart = await service.createCart()
    res.status(200).send(newCart)
  } catch (error) {
    next(error)
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.params.quantity
    const updatedCart = await service.addProductToCart(
      cartId,
      productId,
      quantity
    )
    res.status(200).send(updatedCart)
  } catch (error) {
    next(error)
  }
}

export const updateCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid
    const cart = req.body
    const updatedCart = await service.updateCart(cartId, cart)
    res.status(200).send(updatedCart)
  } catch (error) {
    next(error)
  }
}

export const updateProductQuantity = async (req, res, next) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity
    const updatedCart = await service.updateProductQuantity(
      cartId,
      productId,
      quantity
    )
    res.status(200).send(updatedCart)
  } catch (error) {
    next(error)
  }
}
export const deleteProductFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid
    const productId = req.params.pid
    const updatedCart = await service.deleteProductFromCart(cartId, productId)
    res.status(200).send(updatedCart)
  } catch (error) {
    next(error)
  }
}

export const deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cid
    const updatedCart = await service.deleteAllProductsFromCart(cartId)
    res.status(200).send(updatedCart)
  } catch (error) {
    next(error)
  }
}
