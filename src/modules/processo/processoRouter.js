import express from "express";

import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { createProcessParamsSchema } from "./processo.schema.js";
import { createProcessBodySchema } from "./processo.schema.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

import { createProcess } from "./processoControllers.js";

const router = express.Router();

router.post(
    "/processo/:clienteId/:cnpjId",
    verifyToken,
    validateParams(createProcessParamsSchema),
    validateBody(createProcessBodySchema),
    autorizarPorCnpj("OPERADOR"),
    createProcess
);

export default router;