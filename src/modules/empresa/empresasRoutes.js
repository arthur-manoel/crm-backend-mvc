import express from "express";
import { cadastroEmpresa, empresas } from "./empresasControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { cnpjSchema } from "./cnpj.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();

router.get("/empresas", verifyToken, empresas)
router.post("/empresas", verifyToken, validateBody(cnpjSchema), cadastroEmpresa);

export default router;