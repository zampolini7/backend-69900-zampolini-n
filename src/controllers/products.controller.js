import * as service from '../services/products.services.js'
export const getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, query, sort } = req.query

    const products = await service.getAll(limit, page, query, sort)

    const buildLink = (params) => {
      const queryParams = Object.entries(params)
        .filter(([key, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      return queryParams ? `/api/products?${queryParams}` : null
    }

    const prevLink = products.hasPrevPage
      ? buildLink({ limit, page: products.prevPage, query, sort })
      : null
    const nextLink = products.hasNextPage
      ? buildLink({ limit, page: products.nextPage, query, sort })
      : null

    res.status(200).send({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    })
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.pid
    const product = await service.getById(id)
    if (!product) {
      res.status(404).json({
        message: 'Product not found',
      })
    } else {
      res.status(200).send(product)
    }
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const product = req.body
    const newProduct = await service.create(product)
    res.status(200).send(newProduct)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.pid
    const product = req.body
    const updatedProduct = await service.update(id, product)
    if (updatedProduct) {
      res.status(200).send(updatedProduct)
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.pid
    const deletedProduct = await service.remove(id)
    if (deletedProduct) {
      res.status(200).send({
        message: `Product ${pid} deleted successfully`,
      })
    } else {
      res.status(404).send('Product not found')
    }
  } catch (error) {
    next(error)
  }
}

export const insertMany = async (req, res, next) => {
  try {
    const products = req.body
    const newProducts = await service.insertMany(products)
    res.status(200).send(newProducts)
  } catch (error) {
    next(error)
  }
}
