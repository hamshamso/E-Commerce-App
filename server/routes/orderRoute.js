import express from 'express'
import {createOrder} from "../controllers/orderController.js"
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import {createOrder,getMyOrders,getOredersWithId,updateOrderStatus,getAllOrders} from '../controllers/orderController.js';
const Router = express.Router();

Router.post('/order',ValidateUser,createOrder)
Router.get('order/:id',ValidateUser,getMyOrders)
Router.get('/order/:id',ValidateUser,getOredersWithId)
Router.put('/order/:id',adminOnly,updateOrderStatus)
Router.get('/order',ValidateUser,getAllOrders)

export default Router