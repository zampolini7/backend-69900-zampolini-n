import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import ProductManager from './ProductManager.js';
import { __dirname } from '../path.js';

const productManager = new ProductManager(`${__dirname}/db/products.json`);
class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, 'utf8');
        const parsedCarts = JSON.parse(carts);
        if (parsedCarts.length === 0) {
          return [];
        }
        return parsedCarts;
      } else return [];
    } catch (error) {
      return error;
    }
  }

  async getCartById(cid) {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, 'utf8');
        const parsedCarts = JSON.parse(carts);
        const cart = parsedCarts.find((cart) => cart.id === cid);
        if (cart) {
          return cart;
        } else return false;
      }
    } catch (error) {
      return error;
    }
  }

  async addCart() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, 'utf8');
        const newCart = {
          id: uuidv4(),
          products: [],
        };
        if (!carts || carts.length === 0) {
          await fs.promises.writeFile(this.path, JSON.stringify([newCart]));
          return newCart;
        } else {
          const parsedCarts = JSON.parse(carts);
          parsedCarts.push(newCart);
          await fs.promises.writeFile(this.path, JSON.stringify(parsedCarts));
          return newCart;
        }
      } else {
        const newCart = {
          id: uuidv4(),
          products: [],
        };
        await fs.promises.writeFile(this.path, JSON.stringify([newCart]));
        return newCart;
      }
    } catch (error) {
      return error;
    }
  }

  async addProduct(cid, pid, quantity) {
    try {
      //producto existe?
      const product = await productManager.getProductByID(pid);
      if (!product) throw new Error('Product not found');
      //carrito existe?
      const cart = await this.getCartById(cid);
      const getAllCarts = await this.getAllCarts();

      if (!cart) throw new Error('Cart not found');

      //hay stock?
      const quantityNumber = parseInt(quantity);

      if (product.stock <= quantityNumber) throw new Error('Not enough stock');
      //producto ya en carrito?
      const findProduct = cart.products.find((product) => product.id === pid);
      if (findProduct) {
        //modifico cantidad al producto del carrito
        findProduct.quantity += quantityNumber;
        const updatedProducts = cart.products.map((p)=> p.id === findProduct.id ? findProduct : p);
        cart.products = updatedProducts;
        const updatedCarts = getAllCarts.map((c) => c.id === cid ? cart : c);
        await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
        //modifico stock del producto
        product.stock = product.stock - quantityNumber;
        await productManager.editProduct(product, pid);
        return findProduct;
      } else {
        //agrego producto al carrito
        const newProduct = { id: pid, quantity: quantityNumber };
        cart.products.push(newProduct);
        
        const updatedCarts = getAllCarts.map((c) => c.id === cid ? cart : c);
        await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
        //modifico stock del producto
        // product.stock = product.stock - quantityNumber;
        // await productManager.editProduct(product, pid);

        return newProduct;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default CartManager;
