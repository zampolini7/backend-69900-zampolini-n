import { ProductModel } from './product.model.js'

export class ProductMongoDbDao {
  async getAll(limit = 10, page = 1, query = '', sort = 'desc') {
    const filter = query ? { title: query } : {}
    const sortCondition = sort === 'asc' ? 1 : -1
    try {
      const response = await ProductModel.paginate(filter, {
        page,
        limit,
        sort: { price: sortCondition },
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async create(product) {
    try {
      const response = await ProductModel.create(product)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async update(id, product) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, product, {
        new: true,
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async insertMany(products) {
    try {
      const response = await ProductModel.insertMany(products)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
