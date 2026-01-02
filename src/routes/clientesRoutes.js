import express from "express";
import {
  clientes,
  cadastrarcliente,
  excluircliente,
  atualizarcliente,
} from "../controllers/clientesController.js";
// import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/clientes", clientes);

router.post("/cadastrarcliente", cadastrarcliente);

router.put("/atualizarcliente/:id", atualizarcliente);

router.delete("/excluircliente/:id", excluircliente);

export default router;