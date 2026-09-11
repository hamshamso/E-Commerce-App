import express from 'express';
import {createProduct,getProductById,updateProduct,deleteProduct,getAllProductsWithCategory} from '../controllers/productController.js'
import admin from '../middelwares/adminOnly.js';
import ValidateUser from '../middelwares/validatUser.js'

const Router = express.Router();

Router.post('/products/create',ValidateUser,admin,createProduct)
Router.get('/products/:id',getProductById)
Router.patch('/products/:id',ValidateUser,admin,updateProduct)//patch = partcial update 
Router.delete('/products/:id',ValidateUser,admin,deleteProduct)
Router.get('/products',getAllProductsWithCategory)

export default Router;