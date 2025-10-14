import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post("/signup", authController.userSignUp.bind(authController));
authRouter.post("/login", authController.userLogin.bind(authController)); 
authRouter.post("/passwordReset", authController.userPasswordReset.bind(authController));

export default authRouter;