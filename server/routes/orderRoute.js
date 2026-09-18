import express from 'express'
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import {createOrder,deleteOrder,getMyOrders,updateOrderStatus,getAllOrders,getProductsInfo,cancelProductFromOrder,getDetailedOrders,getOrderById} from '../controllers/orderController.js';
const Router = express.Router();

Router.post('/orders', ValidateUser, createOrder)
Router.get('/orders/my', ValidateUser, getMyOrders)
Router.get('/orders/:id', ValidateUser, getProductsInfo)
Router.get('/orders', ValidateUser, adminOnly, getAllOrders)
Router.get('/dashboard/orders/:id',ValidateUser,adminOnly,getOrderById)
Router.get('/dashboard/orders',ValidateUser,adminOnly,getDetailedOrders)
Router.put('/orders/:id/status', ValidateUser, adminOnly, updateOrderStatus)
Router.delete('/orders/:id',ValidateUser,adminOnly,deleteOrder)
Router.delete('/orders/:orderId/:productId', ValidateUser, cancelProductFromOrder)
export default Router