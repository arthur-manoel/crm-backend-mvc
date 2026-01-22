import express from "express";
import { criarEmpresaUsuario, updateEmpresaUsuario } from "./empresaUsuarioController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.post(
  '/empresa/:cnpjId/usuario',
  verifyToken,
  criarEmpresaUsuario
);

router.put(
  "/empresa/:cnpjId/usuario/:idVinculo",
  verifyToken,
  updateEmpresaUsuario
);

export default router;