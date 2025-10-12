import express from 'express';
import AuthController from '../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();

router.post('/signup', authController.signUp.bind(authController));
router.post('/signin', authController.signIn.bind(authController));
router.post('/password-reset', authController.passwordReset.bind(authController));

export default router;

