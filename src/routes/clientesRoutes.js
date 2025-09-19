import express from "express";
import {
  clientes,
  cadastrarcliente,
  excluircliente,
  atualizarcliente,
} from "../controllers/clientesController.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/clientes", VerificarToken, clientes);

router.post("/cadastrarcliente", VerificarToken, cadastrarcliente);

router.put("/atualizarcliente/:id", VerificarToken, atualizarcliente);

router.delete("/excluircliente/:id", VerificarToken, excluircliente);

export default router;