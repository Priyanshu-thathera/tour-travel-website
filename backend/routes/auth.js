import express  from "express";
import {register,login, logout, loginwithToken, googleLogin} from '../controller/authController.js'
import { verifyUser } from "../utilis/verifyToken.js";
const router = express.Router()

router.post('/register',register)
router.post('/login', login)
router.post('/googleauth',googleLogin)
router.post('/loginwithToken', verifyUser,loginwithToken)
router.post('/logout',logout)

export default router