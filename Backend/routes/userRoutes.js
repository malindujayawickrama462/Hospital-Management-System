import express from "express";
import { loginUser, SignUp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/add",SignUp);
userRouter.post("/login",loginUser);

export default userRouter;