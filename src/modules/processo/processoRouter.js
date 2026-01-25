import express from "express";

import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { cnpjIdParamsSchema, createProcessParamsSchema, idProcessQuerySchema } from "./processo.schema.js";
import { createProcessBodySchema } from "./processo.schema.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

import { createProcess, allProcessByCnpj } from "./processoControllers.js";
import { validateQuery } from "../../middlewares/validateQuery.js";

const router = express.Router();

router.get(
    "/processos/:cnpjId",
    verifyToken,
    validateParams(cnpjIdParamsSchema),
    validateQuery(idProcessQuerySchema),
    autorizarPorCnpj("VISUALIZADOR"),
    allProcessByCnpj
)

router.post(
    "/processo/:clienteId/:cnpjId",
    verifyToken,
    validateParams(createProcessParamsSchema),
    validateBody(createProcessBodySchema),
    autorizarPorCnpj("OPERADOR"),
    createProcess
);

export default router;