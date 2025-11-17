import express from "express";
import { documentos, documentos_solicitados } from "../controllers/documentosController.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/documentos/:cliente_id", VerificarToken, documentos);
router.post("/documentos_solicitados", documentos_solicitados);

export default router;