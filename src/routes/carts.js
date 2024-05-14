import { Router } from "express";

const cartRouter = Router()

cartRouter.get('/', (req, res)=>{
    res.send('llegamos a los carritos')
})

export default cartRouter