import express from "express";
import { endereco, adicionar_endereco, atualizar_endereco, excluir_endereco } from "../controllers/enderecoController.js";

const router = express.Router();

router.get("/endereco", endereco);
router.post("/adicionarendereco", adicionar_endereco);
router.put("/atualizarendereco", atualizar_endereco);
router.delete("/excluirendereco", excluir_endereco);

export default router;