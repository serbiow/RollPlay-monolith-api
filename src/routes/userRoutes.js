import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser.bind(userController));
router.get('/:uid', userController.getUserByUid.bind(userController));
router.get('/email/:email', userController.getUserByEmail.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.put('/:uid', userController.updateUser.bind(userController));
router.delete('/:uid', userController.deleteUser.bind(userController));
router.put('/:uid/deactivate', userController.deactivateUser.bind(userController));
router.put('/:uid/reactivate', userController.reactivateUser.bind(userController));

export default router;

