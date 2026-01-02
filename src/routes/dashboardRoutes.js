import express from "express";
import { dashboard, qtd_tiposProcesso, tipos_processo, clientes_detalhados } from "../controllers/dashboardControllers.js";
// import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/qtd-tiposProcesso", qtd_tiposProcesso)
router.get("/tiposProcesso", tipos_processo)
router.get("/clientes-detalhes", clientes_detalhados)

export default router;