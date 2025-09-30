import express from "express";
import { dashboard, tiposProcesso } from "../controllers/dashboardControllers.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/dashboard", VerificarToken, dashboard);
router.get("/tiposProcesso", VerificarToken, tiposProcesso)

export default router;