import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { empresaClienteSchema } from "./empresaCliente.schema.js";
import { cadastrarEmpresaCliente } from "./empresaClienteControllers.js";

const router = express.Router();

router.post("/empresaCliente/:id", validateBody(empresaClienteSchema), verifyToken, cadastrarEmpresaCliente)

export default router;