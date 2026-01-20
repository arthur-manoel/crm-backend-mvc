import express from "express";
import { links } from "./linkControllers.js";
import { linkParamsSchema } from "./link.schema.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";

const router = express.Router();

router.get(
    "links/:clienteCnpjId",
    validateParams(linkParamsSchema),
    autorizarPorCnpj("VISUALIZADOR"),
    links,
);

export default router;