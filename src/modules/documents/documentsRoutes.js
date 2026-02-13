import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { validateQuery } from "../../middlewares/validateQuery.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

import { 
  listDocuments, 
  requestedDocuments, 
  listDocumentTypes 
} from "./documentsControllers.js";

import { 
  documentsParamsSchema, 
  documentsQuerySchema, 
  requestedDocumentsSchema 
} from "./documents.schema.js";

const router = express.Router();

router.get(
  "/documents/:clientCompanyId/company",
  verifyToken,
  validateParams(documentsParamsSchema),
  validateQuery(documentsQuerySchema),
  listDocuments
);

router.post(
  "/documents/requested",
  verifyToken,
  validateBody(requestedDocumentsSchema),
  requestedDocuments
);

router.get(
  "/document-types",
  verifyToken,
  listDocumentTypes
);

export default router;
