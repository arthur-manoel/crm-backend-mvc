import express from "express";
import { criarVinculo, listarCnaes } from "./cnaesController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { cnaesSchema } from "./cnaes.schema.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";

const router = express.Router();

router.get("/cnaes", verifyToken, listarCnaes);

router.post(
    "/cnaes/:cnaeId/:cnpjId", 
    verifyToken, 
    validateParams(cnaesSchema), 
    autorizarPorCnpj("ADMIN"), 
    criarVinculo
)

export default router;
