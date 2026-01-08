import express from "express";
import { cadastroEmpresa, empresas, atualizarEmpresa, excluirEmpresa } from "./empresasControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { cadastroEmpresaSchema, atualizarEmpresaSchema } from "./empresa.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();

router.get("/empresas", verifyToken, empresas)
router.post("/empresas", verifyToken, validateBody(cadastroEmpresaSchema), cadastroEmpresa);
router.put("/empresas/:id", verifyToken, validateBody(atualizarEmpresaSchema), atualizarEmpresa);
router.delete("/empresas/:id", verifyToken, excluirEmpresa);

export default router;