import express from "express";
import { criarEmpresaUsuario } from "./empresaUsuarioController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.post(
  '/empresa/:cnpjId/usuario',
  verifyToken,
  criarEmpresaUsuario
);

export default router;