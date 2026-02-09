import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import {
  addressBodySchema,
  addressParamsSchema,
  addressIdParamsSchema,
  addressIdsSchema,
  addressPatchSchema,
  deleteAddressSchema
} from "./address.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";
import {
  updateAddress,
  getAddress,
  createAddress,
  deleteAddress
} from "./addressControllers.js";

const router = express.Router();

router.get(
  "/address/:addressId",
  verifyToken,
  validateParams(addressIdParamsSchema),
  getAddress
);

router.post(
  "/address/:clientId/:companyId",
  verifyToken,
  validateParams(addressParamsSchema),
  validateBody(addressBodySchema),
  authorizeByCompany("ADMIN"),
  createAddress
);

router.patch(
  "/address/:addressId/client/:clientId/company/:companyId",
  verifyToken,
  validateParams(addressIdsSchema),
  validateBody(addressPatchSchema),
  authorizeByCompany("ADMIN"),
  updateAddress
);

router.delete(
  "/address/:addressId/client/:clientId/company/:companyId",
  verifyToken,
  validateParams(deleteAddressSchema),
  authorizeByCompany("ADMIN"),
  deleteAddress
);

export default router;
