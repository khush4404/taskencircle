import express from 'express';
import { signup, login, me } from '../controllers/authController.js';

const router = express.Router();


import authMiddleware from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, me);

export default router;