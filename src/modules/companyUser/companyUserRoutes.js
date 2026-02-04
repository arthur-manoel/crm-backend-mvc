import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { companyIdSchema, companyUserBodySchema, companyUserParamsSchema } from "./companyUser.schema.js";

import {
  createCompanyUser,
  updateCompanyUser,
  deleteCompanyUser
} from "./companyUserControllers.js";

const router = express.Router();

router.post(
  "/companies/:companyId/users",
  verifyToken,
  validateBody(companyUserBodySchema),
  createCompanyUser
);

router.put(
  "/companies/:companyId/users/:linkId",
  verifyToken,
  validateParams(companyUserParamsSchema),
  validateBody(companyUserBodySchema),
  updateCompanyUser
);

router.delete(
  "/companies/:companyId/users/:linkId",
  verifyToken,
  validateBody(companyIdSchema),
  deleteCompanyUser
);

export default router;
