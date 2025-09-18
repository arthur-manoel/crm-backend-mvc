import express from "express";
import {
  listarNiveis,
  adicionarNivel,
  editarNivel,
  excluirNivel,
} from "../controllers/niveisController.js";

const router = express.Router();

router.get("/niveis", listarNiveis);
router.post("/niveis", adicionarNivel);
router.put("/niveis/:id", editarNivel);
router.delete("/niveis/:id", excluirNivel);

export default router;
