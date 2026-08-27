import express from 'express'
import {createOrder} from "../controllers/orderController.js"
import ValidateUser from '../middelwares/validatUser.js';

const Router = express.Router();

Router.post('/order',ValidateUser,createOrder)

export default Router