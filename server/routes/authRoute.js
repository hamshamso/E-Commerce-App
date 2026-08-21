import express from 'express';
import authController from '../controllers/authController.js'; 
import RateLimiter from '../middelwares/RateLimiter.js';
import { normalizeEmail, validatemail } from '../middelwares/validators.js';

const Router = express.Router();

Router.post('/login', RateLimiter.authLimiter, normalizeEmail, validatemail, authController.loginuser);
Router.post('/register', RateLimiter.authLimiter, normalizeEmail, validatemail, authController.registeruser);

export default Router;