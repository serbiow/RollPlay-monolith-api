import express from 'express';
import { userController } from '../controllers/userController.js';
//import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/email/:email', userController.getUserByEmail.bind(userController)); 
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.patch('/:id/deactivate', userController.deactivateUser.bind(userController));
router.patch('/:id/reactivate', userController.reactivateUser.bind(userController));

export default router;

