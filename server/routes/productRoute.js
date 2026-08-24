import express from 'express';
import {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getAllProductsWithCategory} from '../controllers/productController.js'
import admin from '../middelwares/adminOnly.js';
import ValidateUser from '../middelwares/validatUser.js'

const Router = express.Router();

Router.post('/products',ValidateUser,admin,createProduct)
Router.get('/products/:id/',getProductById)
Router.post('/products/:id/',ValidateUser,admin,updateProduct)
Router.delete('/products/:id',ValidateUser,admin,deleteProduct)
Router.get('/products',getAllProducts)
Router.get('/category',getAllProductsWithCategory)

export default Router;