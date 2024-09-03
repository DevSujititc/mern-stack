import { userLogin, signup } from "../controllers/UserController.js";
import express from 'express';
import userValidator from "../validators/userValidator.js";


const userRouter = express.Router();

userRouter.post("/signup",userValidator, signup);
userRouter.post("/login",userLogin);

export default userRouter;