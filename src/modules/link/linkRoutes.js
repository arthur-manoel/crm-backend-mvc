import express from "express";
import { links } from "./linkControllers.js";
import { linkParamsSchema } from "./link.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.get(
    "/links/:clienteCnpjId/:cnpjId",
    verifyToken,
    validateParams(linkParamsSchema),
    autorizarPorCnpj("VISUALIZADOR"),
    links,
);

export default router;