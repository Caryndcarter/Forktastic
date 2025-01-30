import { Router } from 'express';
import apiRoutes from './api/index.js';
//import authRoutes from './auth-routes.js';
import openRouter from './open-routes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/api', authenticateToken, apiRoutes);
router.use('/open',openRouter);
//router.use('/auth',authRoutes);

export default router;
