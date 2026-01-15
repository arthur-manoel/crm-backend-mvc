import express from "express";
import { atualizarVinculo, criarVinculo, listarCnaes } from "./cnaesController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { atualizarVinculoSchema, cnaeIdSchema, cnaeVinculoSchema } from "./cnaes.schema.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";

const router = express.Router();

router.get("/cnaes", verifyToken, listarCnaes);

router.post(
    "/cnaes/:cnaeId/:cnpjId", 
    verifyToken, 
    validateParams(cnaeVinculoSchema), 
    autorizarPorCnpj("ADMIN"), 
    criarVinculo
)

router.put(
    "/cnaes/:idVinculo/:cnpjId", 
    verifyToken,
    validateParams(atualizarVinculoSchema),
    validateBody(cnaeIdSchema),
    autorizarPorCnpj("ADMIN"),
    atualizarVinculo
)

export default router;
