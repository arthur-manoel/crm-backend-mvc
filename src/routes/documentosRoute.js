import express from "express";
import { documentos } from "../controllers/documentosController.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/documentos/:cliente_id", VerificarToken, documentos);

export default router;