import express from 'express';
import {createProduct,getAllProducts,getProductById} from '../controllers/productController.js'
import admin from '../middelwares/adminOnly.js';

const Router = express.Router();

Router.post('/products',admin,createProduct)
Router.get('/products/:id/',getProductById)
Router.get('/products',getAllProducts)

export default Router;