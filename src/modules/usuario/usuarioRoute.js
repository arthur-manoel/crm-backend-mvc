import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { cadastroSchema } from "./usuario.schema.js";
import { cadastro, usuarios } from "./usuarioControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";


const router = express.Router();

router.post("/cadastro", validateBody(cadastroSchema), cadastro);
router.get("/usuarios", verifyToken, usuarios)

export default router; 