import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

import {
  listCnaes,
  createCnaeLink,
  updateCnaeLink,
  deleteCnaeLink
} from "./cnaesController.js";

import {
  cnaeLinkParamsSchema,
  createCnaeLinkParamsSchema,
  updateCnaeLinkBodySchema
} from "./cnaes.schema.js";

const router = express.Router();

router.get("/cnaes", verifyToken, listCnaes);

router.post(
  "/cnaes/:cnaeId/:companyId",
  verifyToken,
  validateParams(createCnaeLinkParamsSchema),
  authorizeByCompany("ADMIN"),
  createCnaeLink
);

router.put(
  "/cnae-links/:linkId/:companyId",
  verifyToken,
  validateParams(cnaeLinkParamsSchema),
  validateBody(updateCnaeLinkBodySchema),
  authorizeByCompany("ADMIN"),
  updateCnaeLink
);

router.delete(
  "/cnae-links/:linkId/:companyId",
  verifyToken,
  validateParams(cnaeLinkParamsSchema),
  authorizeByCompany("ADMIN"),
  deleteCnaeLink
);

export default router;
