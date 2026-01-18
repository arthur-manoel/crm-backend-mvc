import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { enderecoBodySchema, enderecoParamsSchema, enderecoIdParamsSchema } from "./endereco.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { autorizarPorCnpj } from "../../middlewares/autorizarPorCnpj.js";
import { buscarEndereco, criarEndereco } from "./enderecoControllers.js";

const router = express.Router();

router.get(
    "/endereco/:idEndereco",
    verifyToken,
    validateParams(enderecoIdParamsSchema),
    buscarEndereco
);

router.post(
    "/endereco/:clienteId/:cnpjId",
    verifyToken,
    validateParams(enderecoParamsSchema),
    validateBody(enderecoBodySchema),
    autorizarPorCnpj("ADMIN"),
    criarEndereco
);

export default router;