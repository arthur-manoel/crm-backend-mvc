import express from "express";
import { documentos, documentos_solicitados, visualizar_documentos } from "../controllers/documentosController.js";
// import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

// router.post("/documentos/:cliente_id", documentos);
// router.post("/documentos_solicitados", documentos_solicitados);
// router.get("/visualizardocumentos", visualizar_documentos);

export default router;