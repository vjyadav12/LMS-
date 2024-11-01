import express from 'express';
import { GetUser, Home, LogOut, Login, SignUp } from '../Controllers/User.Controllers.js';
import isLoggedIn from '../MiddleWare/user.middleware.js';
import Upload from '../MiddleWare/multer.middleware.js';

const router = express.Router();

router.get("/",Home)
router.post("/signup",Upload.single('avatar'), SignUp)
router.post("/login",Login)
router.get("/getUser",isLoggedIn,GetUser) 
router.post('/logout',LogOut)

export default router