import express from 'express'
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import { getActiveUsersLastMonth } from '../controllers/statisticsController.js';
const Router = express.Router();

Router.get('/dashboard/users',ValidateUser,adminOnly,getActiveUsersLastMonth)

export default Router