// src/modules/links/link.routes.js

import express from "express";

import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { validateQuery } from "../../middlewares/validateQuery.js";
import { authorizeByAssociation } from "../../middlewares/authorizeByAssociation.js";

import {
  createLinkBodySchema,
  createLinkParamsSchema,
  deleteLinkParamsSchema,
  linkIdQuerySchema
} from "./link.schema.js";

import {
  createLink,
  deleteLink,
  getLinksByClientCompany
} from "./linkControllers.js";

const router = express.Router();

router.get(
  "/links/:clientCompanyId",
  verifyToken,
  validateParams(createLinkParamsSchema),
  validateQuery(linkIdQuerySchema),
  authorizeByAssociation("VIEWER"),
  getLinksByClientCompany
);

router.post(
  "/links/:clientCompanyId",
  verifyToken,
  validateParams(createLinkParamsSchema),
  validateBody(createLinkBodySchema),
  authorizeByAssociation("EDITOR"),
  createLink
);

router.delete(
  "/links/:linkId",
  verifyToken,
  validateParams(deleteLinkParamsSchema),
  deleteLink
);

export default router;