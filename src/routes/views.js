import { Router } from 'express'
import ProductManager from '../managers/ProductManager.js'
import { __dirname } from '../path.js'
import { socketServer } from '../server.js'
const viewsRouter = Router()

const productManager = new ProductManager(`${__dirname}/db/products.json`)

viewsRouter.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render('home', { products })
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).send('Error al obtener los productos')
  }
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts()
    res.render('realtimeproducts', { products })
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).send('Error al obtener los productos')
  }
})

viewsRouter.post('/realtimeproducts', async (req, res) => {
  const { title, description, price } = req.body

  const product = {
    title,
    description,
    price,
    code: 'MS001',
    stock: 79,
    category: 'Tecnología',
    thumbnails: ['ruta/mouse1.jpg', 'ruta/mouse2.jpg', 'ruta/mouse3.jpg'],
  }

  try {
    const newProduct = await productManager.createProduct(product)
    if (newProduct) {
      const products = await productManager.getProducts()
      socketServer.emit('products', products)
    } else {
      res.status(400).send('Error al crear el producto')
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).send('Error al obtener los productos')
  }
})

viewsRouter.delete('/realtimeproducts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await productManager.deleteProduct(id)
    if (deletedProduct) {
      const products = await productManager.getProducts()
      socketServer.emit('products', products)
    } else {
      res.status(404).send('Producto no encontrado')
    }
  } catch (error) {
    console.error('Error al obtener los productos:', error)
    res.status(500).send('Error al obtener los productos')
  }
})

export default viewsRouter
