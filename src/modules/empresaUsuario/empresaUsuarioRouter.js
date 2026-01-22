import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { 
  criarEmpresaUsuario, 
  deleteEmpresaUsuario, 
  updateEmpresaUsuario 
} from "./empresaUsuarioController.js";

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

router.delete(
  "/empresa/:cnpjId/usuario/:idVinculo",
  verifyToken,
  deleteEmpresaUsuario
);
export default router;