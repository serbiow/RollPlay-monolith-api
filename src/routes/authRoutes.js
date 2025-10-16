import express from "express";
import { authController } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp.bind(authController));
authRouter.post("/reset-password", authController.resetPassword.bind(authController));
authRouter.post("/profile", authMiddleware, authController.getProfile.bind(authController));

export default authRouter;