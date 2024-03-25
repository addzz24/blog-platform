import express from 'express';
import { authenticate } from './middleware/authMiddleware.js';
import { userRouter } from './routes/user.router.js';

const router = express.Router();

// Public routes
router.post('/register', userRouter);
router.post('/login', userRouter);

// Protected route
router.get('/profile', authenticate, getUserProfile);

export default router;
