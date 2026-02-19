import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";
import { validateParams } from "../../middlewares/validateParams.js";

import { 
  clientCompanyParamsSchema, 
  createCompanySchema, 
  updateCompanySchema, 
  companyIdParamSchema 
} from "./company.schema.js";

import { 
  createCompany, 
  getClientCompany, 
  updateCompany, 
  deleteCompany, 
  getCompanyActivities
} from "./companyControllers.js";

const router = express.Router();

router.get(
  "/company/:clientId/:companyId",
  verifyToken,
  validateParams(clientCompanyParamsSchema),
  authorizeByCompany("VIEWER"),
  getClientCompany
);

router.get(
  "/companies/:companyId/activities",
  verifyToken,
  validateParams(companyIdParamSchema),
  authorizeByCompany("VIEWER"),
  getCompanyActivities
);

router.put(
  "/companies/:companyId",
  verifyToken, 
  validateParams(companyIdParamSchema),
  authorizeByCompany("ADMIN"),
  validateBody(updateCompanySchema), 
  updateCompany
);

router.post(
  "/companies", 
  verifyToken, 
  validateBody(createCompanySchema), 
  createCompany
);

// TODO: Re-enable after refactoring dependent domains (process, address, company-client, company-cnae)
router.delete(
  "/companies/:companyId", 
  verifyToken, 
  validateParams(companyIdParamSchema), 
  authorizeByCompany("ADMIN"), 
  deleteCompany
);

export default router;
