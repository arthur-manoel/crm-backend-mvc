import express from "express";
import {
  processos,
  processo,
  abrirprocesso,
  excluirprocesso,
  atualizarprocesso
} from "../controllers/processosController.js";

const router = express.Router();

router.get("/processos", processos);

router.get("/processo/:id", processo);

router.post("/processo", abrirprocesso);

router.put("/processo/:id", atualizarprocesso)

router.delete("/processo/:id", excluirprocesso);

export default router;