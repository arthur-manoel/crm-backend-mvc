import express from "express";

import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { validateQuery } from "../../middlewares/validateQuery.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

import {
  companyIdParamsSchema,
  createProcessParamsSchema,
  processIdQuerySchema,
  createProcessBodySchema
} from "./process.schema.js";

import {
  createProcess,
  getProcessesByCompany
} from "./processControllers.js";

const router = express.Router();

router.get(
  "/processes/:companyId",
  verifyToken,
  validateParams(companyIdParamsSchema),
  validateQuery(processIdQuerySchema),
  authorizeByCompany("VIEWER"),
  getProcessesByCompany
);

router.post(
  "/processes/:clientId/:companyId",
  verifyToken,
  validateParams(createProcessParamsSchema),
  validateBody(createProcessBodySchema),
  authorizeByCompany("EDITOR"),
  createProcess
);

export default router;
