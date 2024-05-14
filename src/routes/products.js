import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { __dirname } from '../path.js'
import validarProducto from "../middleware/productValidate.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`);

const productRouter = Router()

productRouter.get('/', async (req, res)=>{
    const { limit } = req.query
    try {
        const products = await productManager.getProducts(limit)
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)        
    }
})

productRouter.get('/:pid', async (req, res)=>{
    const { pid } = req.params
    try {
        const product = await productManager.getProductByID(pid)
        if (product) {
            res.status(200).send(product)
        } else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).send(error)        
    }
})


productRouter.post('/', validarProducto, async (req, res)=>{
    const body  = req.body
    try {
        const product = await productManager.createProduct(body)
        if (product) {
            res.status(200).send(product)
        } else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).send(error)        
    }
})


productRouter.put('/:pid', validarProducto, async (req, res)=>{
    const body  = req.body
    const { pid } = req.params
    try {
        const product = await productManager.editProduct(body, pid)
        if (product) {
            res.status(200).send(product)
        } else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).send(error)        
    }
})

productRouter.delete('/:pid', async (req, res)=>{
    const { pid } = req.params
    try {
        const product = await productManager.deleteProduct( pid)
        if (product) {
            res.status(200).send({
                message: `Product ${pid} deleted successfully`
            })
        } else{
            res.status(404).send("Product not found")
        }
    } catch (error) {
        res.status(400).send(error)        
    }
})

export default productRouter