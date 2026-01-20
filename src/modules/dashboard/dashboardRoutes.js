import express from 'express';
import { dashboard } from './dashboardControllers.js';
import { verifyToken } from '../../middlewares/tokenVerify.js';

const router = express.Router();

router.get('/dashboard', verifyToken, dashboard);

export default router;