import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

import {
  idParamSchema,
  createCompanyClientSchema,
  updateCompanyClientBodySchema,
  companyClientParamsSchema,
  companyClientDeleteParamsSchema
} from "./companyClient.schema.js";

import {
  listClientCompanies,
  createCompanyClient,
  updateCompanyClient,
  deleteCompanyClient
} from "./companyClientControllers.js";
import { authorizeByAssociation } from "../../middlewares/authorizeByAssociation.js";

const router = express.Router();

router.get(
  "/clients/:id/companies",
  verifyToken,
  validateParams(idParamSchema),
  listClientCompanies
);

router.post(
  "/company-clients/:clientId/:companyId",
  verifyToken,
  validateParams(createCompanyClientSchema),
  authorizeByCompany("ADMIN"),
  createCompanyClient
);

router.put(
  "/company-clients/:linkId/:companyId",
  verifyToken,
  validateParams(companyClientParamsSchema),
  authorizeByCompany("ADMIN"),
  validateBody(updateCompanyClientBodySchema),
  updateCompanyClient
);

router.delete(
  "/company-clients/:clientCompanyId",
  verifyToken,
  validateParams(companyClientDeleteParamsSchema),
  authorizeByAssociation("ADMIN"),
  deleteCompanyClient
);

export default router;
