import express from 'express';
const router = express.Router();
import { addUser, getUsers, getUser, removeUser } from '../controllers/userController.js';
import validateUser from '../middlewares/validateUser.js';

router.post('/users', validateUser, addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.delete('/users/:id', removeUser);

export default router;
