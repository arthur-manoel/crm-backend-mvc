import express from "express";
import { cadastrarCliente } from "./clienteController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { cadastroClienteSchema } from "./cliente.schema.js";

const router = express.Router();

router.post("/cadastrarcliente", verifyToken, validateBody(cadastroClienteSchema), cadastrarCliente);

export default router;