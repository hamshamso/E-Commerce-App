import express from 'express'
import {createOrder} from "../controllers/orderController.js"
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import { getMyOrders } from '../controllers/orderController.js';
import { getOredersWithId } from '../controllers/orderController.js';
const Router = express.Router();

Router.post('/order',ValidateUser,createOrder)
Router.get('/order/:id',ValidateUser,adminOnly,getOredersWithId)
Router.get('order/:id',ValidateUser,getMyOrders)
export default Router