import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { enderecoBodySchema, enderecoParamsSchema, enderecoIdParamsSchema, enderecoIdsSchema, enderecoPatchSchema, deleteEnderecoSchema } from "./endereco.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { authorizeByCompany } from "../../middlewares/authorizeByCompany.js";
import { atualizarEndereco, buscarEndereco, criarEndereco, deletarEndereco } from "./enderecoControllers.js";

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
    authorizeByCompany("ADMIN"),
    criarEndereco
);

router.patch(
    "/endereco/:idEndereco/cliente/:clienteId/empresa/:cnpjId",
    verifyToken,
    validateParams(enderecoIdsSchema),
    validateBody(enderecoPatchSchema),
    authorizeByCompany("ADMIN"),
    atualizarEndereco
);

router.delete(
    "/endereco/:idEndereco/cliente/:clienteId/empresa/:cnpjId",
    verifyToken,
    validateParams(deleteEnderecoSchema),
    authorizeByCompany("ADMIN"),
    deletarEndereco
);

export default router;