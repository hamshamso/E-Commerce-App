import express from 'express';
import authController from '../controllers/authController.js';
import RateLimiter from '../middelwares/RateLimiter.js';
import { normalizeEmail, validatemail } from '../middelwares/validators.js';
import admin from '../middelwares/adminOnly.js';
import ValidateUser from '../middelwares/validatUser.js';
import {createProduct,} from '../controllers/productController.js'
const Router = express.Router();

Router.post('/login', RateLimiter.authLimiter, normalizeEmail, validatemail, authController.loginuser);
Router.post('/register', RateLimiter.authLimiter, normalizeEmail, validatemail, authController.registeruser);
Router.get('/dashboard', ValidateUser, admin);
export default Router;