import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { idSchema, cadastrarEmpresaClienteSchema, atualizarEmpresaClienteBodySchema, atualizarEmpresaClienteParamsSchema } from "./empresaCliente.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";

import {
    atualizarEmpresaCliente,
    cadastrarEmpresaCliente, 
    empresasCliente, 
    excluirVinculoClienteEmpresa
 } from "./empresaClienteControllers.js";

const router = express.Router();

router.get(
  "/empresasCliente/:id",
  verifyToken,
  validateParams(idSchema),
  empresasCliente
);

router.post(
  "/empresaCliente/:clienteId/:cnpjId",
  verifyToken,
  validateParams(cadastrarEmpresaClienteSchema),
  autorizarPorCnpj("ADMIN"),
  cadastrarEmpresaCliente
);

router.put(
  "/empresaCliente/:idVinculo/:cnpjId",
  verifyToken,
  validateParams(atualizarEmpresaClienteParamsSchema),
  autorizarPorCnpj("ADMIN"),
  validateBody(atualizarEmpresaClienteBodySchema),
  atualizarEmpresaCliente
);

router.delete("/empresaCliente/:id", verifyToken, excluirVinculoClienteEmpresa);

export default router;