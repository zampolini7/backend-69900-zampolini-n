import { CartModel } from './models/cart.model.js'

export class CartMongoDbDao {
  async getAll() {
    try {
      return await CartModel.find({}).populate('products.product')
    } catch (error) {
      throw new Error(error)
    }
  }
  async create() {
    try {
      const response = await CartModel.create({
        products: [],
      })
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async getById(cartId) {
    try {
      const response = await CartModel.findById(cartId).populate(
        'products.product'
      )
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async delete(cartId) {
    try {
      const response = await CartModel.findByIdAndDelete(cartId)
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async existProdInCart(cartId, prodId) {
    try {
      return await CartModel.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId)
      if (!cart) {
        throw new Error('Carrito no encontrado')
      }
      const existProductInCart = await this.existProdInCart(cartId, productId)
      if (existProductInCart) {
        const findAndAddProduct = await CartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': productId },
          { $inc: { 'products.$.quantity': quantity } },
          { new: true }
        )
        return findAndAddProduct
      } else {
        const addProductToCart = await CartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { product: productId } } },
          { new: true }
        )
        return addProductToCart
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const response = await CartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { product: productId } } },
        { new: true }
      )
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteAllProductsFromCart(cartId) {
    try {
      const response = await CartModel.findByIdAndUpdate(
        cartId,
        { $set: { products: [] } },
        { new: true }
      )
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateCart(cartId, cart) {
    try {
      const response = await CartModel.findByIdAndUpdate(cartId, cart, {
        new: true,
      })
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
