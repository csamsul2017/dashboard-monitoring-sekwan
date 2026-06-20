import express from 'express';
import * as authController from '../controllers/authController.js';
import validateLogin from '../middlewares/validateLogin.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', validateLogin, authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.post('/refresh', authController.refresh);

export default router;
