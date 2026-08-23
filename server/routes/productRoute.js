import express from 'express';
import {createProduct,getAllProducts,getProductById} from '../controllers/productController.js'
const Router = express.Router();

Router.post('/products',createProduct)
Router.get('/products/:id/',getProductById)
Router.get('/products',getAllProducts)

export default Router;