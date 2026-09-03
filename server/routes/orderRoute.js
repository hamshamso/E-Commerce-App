import express from 'express'
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import {createOrder,getMyOrders,updateOrderStatus,getAllOrders,getProductsInfo} from '../controllers/orderController.js';
const Router = express.Router();

Router.post('/orders', ValidateUser, createOrder)
Router.get('/orders/my', ValidateUser, getMyOrders)
Router.get('/orders/:id', ValidateUser, getProductsInfo)
Router.get('/orders', ValidateUser, adminOnly, getAllOrders)
Router.put('/orders/:id/status', ValidateUser, adminOnly, updateOrderStatus)
Router.get('/orders', ValidateUser, getProductsInfo)
export default Router