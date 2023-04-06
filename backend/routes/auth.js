import express from 'express';
import { register , login, logout, changePassword, refreshToken } from '../controllers/auth.js';
import { verifyUser } from '../utils/vertifyToken.js';
const router = express.Router();
// REGISTER
router.post("/register", register)
// LOGIN
router.post("/login", login)
// LOGOUT
router.post("/logout",logout)
// CHANGEPASSWORD
router.post("/changepassword",verifyUser,changePassword)
// REFERSH TOKEN
router.post("/refreshtoken",refreshToken)
export default router