import express from 'express';
import { loginuser, registeruser } from '../controllers/authController.js';
import { normalizeEmail, validatemail} from '../middelwares/validators.js';
const Router = express.Router();

Router.post('/login', normalizeEmail, validatemail,loginuser);
Router.post('/register', normalizeEmail, validatemail,registeruser);
export default Router;