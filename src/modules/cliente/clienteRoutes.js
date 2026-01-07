import express from "express";
import { cadastrarCliente, clientes, atualizarCliente, excluirCliente } from "./clienteControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { clienteSchema } from "./cliente.schema.js";

const router = express.Router();

router.get("/clientes", verifyToken, clientes);
router.post("/clientes", verifyToken, validateBody(clienteSchema), cadastrarCliente);
router.put("/clientes/:id", verifyToken, validateBody(clienteSchema), atualizarCliente)
router.delete("/clientes/:id", verifyToken, excluirCliente);

export default router; 