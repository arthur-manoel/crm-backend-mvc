import express from "express";
import { cadastroEmpresa, empresas, atualizarEmpresa, excluirEmpresa } from "./empresasControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { clienteEmpresaParamsSchema, cadastroEmpresaSchema, atualizarEmpresaSchema, cnpjIdParamSchema } from "./empresa.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { validateParams } from "../../middlewares/validateParams.js";

const router = express.Router();

router.get(
  "/empresa/:clienteId/:cnpjId",
  verifyToken,
  validateParams(clienteEmpresaParamsSchema),
  autorizarPorCnpj("VISUALIZADOR"),
  empresas
);

router.put(
    "/empresas/:cnpjId",
    verifyToken, 
    validateParams(cnpjIdParamSchema),
    autorizarPorCnpj("ADMIN"),
    validateBody(atualizarEmpresaSchema), 
    atualizarEmpresa
);

router.post("/empresas", verifyToken, validateBody(cadastroEmpresaSchema), cadastroEmpresa);
router.delete("/empresas/:id", verifyToken, excluirEmpresa);

export default router;