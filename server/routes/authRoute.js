import express from 'express';
import authController from '../controllers/authController.js';
import { normalizeEmail, validatemail } from '../middelwares/validators.js';
import admin from '../middelwares/adminOnly.js';
import ValidateUser from '../middelwares/validatUser.js';
const Router = express.Router();

Router.post('/login', normalizeEmail, validatemail, authController.loginuser);
Router.post('/register', normalizeEmail, validatemail, authController.registeruser);
Router.get('/dashboard', ValidateUser, admin);

export default Router;