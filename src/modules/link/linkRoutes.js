import express from "express";
import { links } from "./linkControllers.js";
import { linkParamsSchema } from "./link.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.get(
    "/links/:clienteCnpjId/:cnpjId",
    verifyToken,
    validateParams(linkParamsSchema),
    authorizeByCompany("VIEWER"),
    links,
);

export default router;