import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)){
            const products = await fs.promises.readFile(this.path, "utf8");
            const parsedProducts = JSON.parse(products);
            const filteredProducts = limit ? parsedProducts.slice(0, limit): parsedProducts;
           return filteredProducts;
        } else return [];
       } catch (error) {
        return error
       }
    }

    async getProductByID(id) {
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf8");
                const parsedProducts = JSON.parse(products);
                const product = parsedProducts.find(product => product.id === id);
                return product;
            } else return false;
        } catch (error) {
            return error
        }
    }

    async createProduct(product) {
        try {
            const newProduct = { id: uuidv4(), status: true, ...product };
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                if (!products) {
                    await fs.promises.writeFile(this.path, JSON.stringify(newProduct));
                    return newProduct;
                } else{
                    const parsedProducts = JSON.parse(products);
                    parsedProducts.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts));
                    return newProduct;
                }
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify([newProduct]));
                return newProduct;
            }
        } catch (error) {
            return error;
        }
    }


    async editProduct(product, pid) {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                const parsedProducts = JSON.parse(products);
                const productIndex = parsedProducts.findIndex(p => p.id === pid);
                if (productIndex === -1) return false;
                const updatedProduct = { ...parsedProducts[productIndex], ...product };
                parsedProducts.push(updatedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts));
                return updatedProduct;
            } else {
               return false
            }
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(pid) {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8")
                const parsedProducts = JSON.parse(products)
                const productIndex = parsedProducts.findIndex(p => p.id === pid)
                if (productIndex === -1) return false
                parsedProducts.splice(productIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(parsedProducts))
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return error;
        }
    }
}

export default ProductManager;