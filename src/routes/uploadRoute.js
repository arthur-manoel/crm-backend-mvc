import { uploadArquivos, criarLink } from "../controllers/uploadController.js";
import express from "express";

const router = express.Router();

router.post("/uploadarquivo/:cliente_id", uploadArquivos);
router.post("/criarLink", criarLink);

export default router