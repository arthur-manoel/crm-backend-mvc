import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { listarDocumentos } from "./documentosControllers.js";
import { validateQuery } from "../../middlewares/validateQuery.js";
import { documentosParamsSchema, documentosQuerySchema } from "./documentos.schema.js";

const router = express.Router();

router.get(
  "/documentos/:cnpjId/empresa",
  verifyToken,
  validateParams(documentosParamsSchema),
  validateQuery(documentosQuerySchema),
  autorizarPorCnpj("VISUALIZADOR"),
  listarDocumentos
);


export default router;