import express from "express";
import { atualizarVinculo, criarVinculo, excluirVinculo, listarCnaes } from "./cnaesController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { vinculoParamsSchema, cnaeIdSchema, cnaeVinculoSchema } from "./cnaes.schema.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";

const router = express.Router();

router.get("/cnaes", verifyToken, listarCnaes);

router.post(
    "/cnaes/:cnaeId/:cnpjId", 
    verifyToken, 
    validateParams(cnaeVinculoSchema), 
    authorizeByCompany("ADMIN"), 
    criarVinculo
)

router.put(
    "/cnaes/:idVinculo/:cnpjId", 
    verifyToken,
    validateParams(vinculoParamsSchema),
    validateBody(cnaeIdSchema),
    authorizeByCompany("ADMIN"),
    atualizarVinculo
)

router.delete(
    "/cnaes/:idVinculo/:cnpjId",
    verifyToken,
    validateParams(vinculoParamsSchema),
    authorizeByCompany("ADMIN"),
    excluirVinculo
)

export default router;
