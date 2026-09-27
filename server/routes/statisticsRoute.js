import express from 'express'
import ValidateUser from '../middelwares/validatUser.js';
import adminOnly from '../middelwares/adminOnly.js';
import { getUsersStatistics, getAllUsers} from '../controllers/statisticsController.js';
const Router = express.Router();

Router.get('/dashboard/users/statistics',ValidateUser,adminOnly,getUsersStatistics)
Router.get('/dashboard/users',ValidateUser,adminOnly,getAllUsers)
export default Router