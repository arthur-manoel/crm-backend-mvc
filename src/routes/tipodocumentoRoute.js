import express from "express";
import { documentos } from "../controllers/tipodocumentoController.js";

const router = express.Router();

router.get("/documentos", documentos);

export default router;