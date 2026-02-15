import express from "express";
import { getLinks } from "./linkControllers.js";
import { linkParamsSchema } from "./link.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { authorizeByAssociation } from "../../middlewares/authorizeByAssociation.js";

const router = express.Router();

router.get(
  "/links/:clientCompanyId",
  verifyToken,
  validateParams(linkParamsSchema),
  authorizeByAssociation("VIEWER"),
  getLinks
);

export default router;