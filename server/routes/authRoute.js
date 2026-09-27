import express from 'express';
import { loginuser, registeruser, getActiveUsersLastMonth } from '../controllers/authController.js';
import { normalizeEmail, validatemail} from '../middelwares/validators.js';
import adminOnly from '../middelwares/adminOnly.js';
import {ValidateUser} from '../middelwares/validatUser.js'
const Router = express.Router();

Router.post('/login', normalizeEmail, validatemail,loginuser);
Router.post('/register', normalizeEmail, validatemail,registeruser);
Router.get('/dashboard/users',ValidateUser,adminOnly,getActiveUsersLastMonth)
export default Router;