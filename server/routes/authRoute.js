import express from 'express';
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import { loginuser, registeruser, addNewUser, removeUser} from '../controllers/authController.js';
import { normalizeEmail, validatemail} from '../middelwares/validators.js';
const Router = express.Router();

Router.post('/login', normalizeEmail, validatemail,loginuser);
Router.post('/register', normalizeEmail, validatemail,registeruser);
Router.post('/dashboard/users',ValidateUser, adminOnly, addNewUser);
Router.delete('/dashboard/users/:id',ValidateUser, adminOnly, removeUser);
export default Router;