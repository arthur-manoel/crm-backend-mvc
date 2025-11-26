import express from "express";
import { endereco, adicionar_endereco, atualizar_endereco_cliente ,atualizar_endereco, excluir_endereco } from "../controllers/enderecoController.js";

const router = express.Router();

router.get("/endereco", endereco);
router.post("/adicionarendereco", adicionar_endereco);
router.put("/atualizarendereco", atualizar_endereco);
router.put("/atualizar-endereco-cliente", atualizar_endereco_cliente)
router.delete("/excluirendereco/:id", excluir_endereco);

export default router;