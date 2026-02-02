import express from "express";

import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";
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
    authorizeByCompany("VIEWER"),
    allProcessByCnpj
)

router.post(
    "/processo/:clienteId/:cnpjId",
    verifyToken,
    validateParams(createProcessParamsSchema),
    validateBody(createProcessBodySchema),
    authorizeByCompany("EDITOR"),
    createProcess
);

export default router;