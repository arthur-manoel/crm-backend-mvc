import express from "express";
import { dashboard, qtd_tiposProcesso, tipos_processo, clientes_detalhados } from "../controllers/dashboardControllers.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/dashboard", VerificarToken, dashboard);
router.get("/qtd-tiposProcesso", VerificarToken, qtd_tiposProcesso)
router.get("/tiposProcesso", VerificarToken, tipos_processo)
router.get("/clientes-detalhes", VerificarToken, clientes_detalhados)

export default router;