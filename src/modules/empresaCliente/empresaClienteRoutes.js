import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { cadastrarEmpresaClienteSchema, atualizarEmpresaClienteSchema } from "./empresaCliente.schema.js";
import { atualizarEmpresaCliente, cadastrarEmpresaCliente, empresasCliente } from "./empresaClienteControllers.js";

const router = express.Router();

router.get("/empresasCliente/:id", verifyToken, empresasCliente)
router.post("/empresaCliente/:id", validateBody(cadastrarEmpresaClienteSchema), verifyToken, cadastrarEmpresaCliente)
router.put("/empresaCliente", validateBody(atualizarEmpresaClienteSchema), verifyToken, atualizarEmpresaCliente)

export default router;