import express from 'express';
import { dashboard, getClientDetails, processTypes } from './dashboardControllers.js';
import { validateParams } from "../../middlewares/validateParams.js"
import { verifyToken } from '../../middlewares/tokenVerify.js';
import { clientIdSchema } from './dashboard.schema.js';

const router = express.Router();

router.get('/dashboard', verifyToken, dashboard);
router.get("/process-types", verifyToken, processTypes);
router.get("/clients-details/:clientId", verifyToken, validateParams(clientIdSchema), getClientDetails);

export default router;
