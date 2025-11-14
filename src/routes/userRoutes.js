import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/token/', authMiddleware, userController.getUserByToken.bind(userController));
router.get('/email/:email', authMiddleware, userController.getUserByEmail.bind(userController)); 

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', authMiddleware, userController.getUserById.bind(userController));
router.put('/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

// TODO: ver como funciona essas rotas e se são necessárias
router.patch('/:id/deactivate', userController.deactivateUser.bind(userController));
router.patch('/:id/reactivate', userController.reactivateUser.bind(userController));

export default router;
