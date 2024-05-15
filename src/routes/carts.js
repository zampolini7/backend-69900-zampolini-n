import { Router } from 'express';
import CartManager from '../managers/CartManager.js';
import { __dirname } from '../path.js';

const cartManager = new CartManager(`${__dirname}/db/carts.json`);

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    return res.status(200).send({
      data: carts,
      message: 'Carts retrieved successfully',
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

cartRouter.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(cid);
    if (cart) {
      return res.status(200).send({
        data: cart,
        message: 'Cart retrieved successfully',
      });
    } else {
      return res.status(404).send({
        message: 'Cart not found',
      });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
});

cartRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    return res.status(201).send({
      data: newCart,
      message: 'Cart created successfully',
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

cartRouter.post('/:cid/products/:pid', async (req, res) => {
  const { quantity } = req.body;
  const { cid, pid } = req.params;

  try {
    const addedProduct = await cartManager.addProduct(cid, pid, quantity);
    return res.status(201).send({
      data: addedProduct,
      message: 'product added successfully',
    });
  } catch (error) {
    console.error(error); 
    return res.status(400).send({
      msg: error.message,
    });
  }
});

export default cartRouter;
