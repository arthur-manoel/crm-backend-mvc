import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { checkCompanyExists } from "../../middlewares/checkCompanyExists.js";

import { 
  clienteEmpresaParamsSchema, 
  cadastroEmpresaSchema, 
  atualizarEmpresaSchema, 
  cnpjIdParamSchema 
} from "./empresa.schema.js";

import { 
  cadastroEmpresa, 
  empresas, 
  atualizarEmpresa, 
  excluirEmpresa, 
  companyActivity
 } from "./empresasControllers.js";

const router = express.Router();

router.get(
  "/empresa/:clienteId/:cnpjId",
  verifyToken,
  validateParams(clienteEmpresaParamsSchema),
  autorizarPorCnpj("VISUALIZADOR"),
  empresas
);

router.get(
  "/empresas/:cnpjId/cnaes",
  verifyToken,
  validateParams(cnpjIdParamSchema),
  checkCompanyExists,
  autorizarPorCnpj("VISUALIZADOR"),
  companyActivity 
)

router.put(
    "/empresas/:cnpjId",
    verifyToken, 
    validateParams(cnpjIdParamSchema),
    autorizarPorCnpj("ADMIN"),
    validateBody(atualizarEmpresaSchema), 
    atualizarEmpresa
);

router.post(
  "/empresas", 
  verifyToken, 
  validateBody(cadastroEmpresaSchema), 
  cadastroEmpresa
);

router.delete(
  "/empresas/:cnpjId", 
  verifyToken, 
  validateParams(cnpjIdParamSchema), 
  autorizarPorCnpj("ADMIN"), 
  excluirEmpresa
);

export default router;