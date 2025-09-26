import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();


import authMiddleware from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, (req, res) => {
  // Only return the fields needed by the frontend
  const { _id, email } = req.user;
  res.json({ _id, email });
});

export default router;