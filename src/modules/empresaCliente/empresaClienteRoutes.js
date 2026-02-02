import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { idSchema, cadastrarEmpresaClienteSchema, atualizarEmpresaClienteBodySchema, vinculoEmpresaClienteParamsSchema } from "./empresaCliente.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

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
  authorizeByCompany("ADMIN"),
  cadastrarEmpresaCliente
);

router.put(
  "/empresaCliente/:idVinculo/:cnpjId",
  verifyToken,
  validateParams(vinculoEmpresaClienteParamsSchema),
  authorizeByCompany("ADMIN"),
  validateBody(atualizarEmpresaClienteBodySchema),
  atualizarEmpresaCliente
);

router.delete(
  "/empresaCliente/:idVinculo/:cnpjId",
  verifyToken,
  validateParams(vinculoEmpresaClienteParamsSchema),
  authorizeByCompany("ADMIN"),
  excluirVinculoClienteEmpresa
);

export default router;