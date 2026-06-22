import express from 'express';
const router = express.Router();
import { addUser, getUsers, getUser, updateUser, removeUser } from '../controllers/userController.js';
import validateUser from '../middlewares/validateUser.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validateUpdateUser from '../middlewares/validateUpdateUser.js';

router.post('/users', authMiddleware, validateUser, addUser);
router.get('/users', authMiddleware, getUsers);
router.get('/users/:id', authMiddleware, getUser);
router.patch('/users/:id', authMiddleware, validateUpdateUser, updateUser);
router.delete('/users/:id', authMiddleware, removeUser);

export default router;
