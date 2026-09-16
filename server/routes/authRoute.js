import express from 'express';
import authController from '../controllers/authController.js';
import { normalizeEmail, validatemail } from '../middelwares/validators.js';
const Router = express.Router();

Router.post('/login', normalizeEmail, validatemail, authController.loginuser);
Router.post('/register', normalizeEmail, validatemail, authController.registeruser);

export default Router;