import express from 'express';
const router = express.Router();
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);


export default router;