import { uploadArquivos, criarLink, inserir_documentos } from "../controllers/uploadController.js";
import express from "express";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 50MB (ajuste se quiser)
});

router.post("/inserirdocumentos", inserir_documentos)
router.post("/uploadarquivo/:cliente_id", upload.single("arquivo"), uploadArquivos);
router.post("/criarLink", criarLink);

export default router