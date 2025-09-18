import express from "express";
import dashboard from "../controllers/dashboardControllers.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/dashboard", VerificarToken, dashboard);

export default router;
