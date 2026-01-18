import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateQuery } from "../../middlewares/validateQuery.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { documentosSolicitados, listarDocumentos, tipsoDocumentos } from "./documentosControllers.js";

import { 
  documentosParamsSchema, 
  documentosQuerySchema, 
  documentosSolicitadosSchema 
} from "./documentos.schema.js";


const router = express.Router();

router.get(
  "/documentos/:cnpjId/empresa",
  verifyToken,
  validateParams(documentosParamsSchema),
  validateQuery(documentosQuerySchema),
  autorizarPorCnpj("VISUALIZADOR"),
  listarDocumentos
);

router.post(
  "/documentosSolicitados",
  validateBody(documentosSolicitadosSchema),
  verifyToken,
  documentosSolicitados
);

router.get("/tiposDocumento", verifyToken, tipsoDocumentos)
export default router;