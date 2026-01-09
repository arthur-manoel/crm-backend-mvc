import express from "express";
import { cliente_cnpjs, adicionar_cnpj, atualizar_cnpj, excluir_cnpj} from "../controllers/clientecnpjController.js";

const router = express.Router();

// router.get("/cliente_cnpjs/:id", cliente_cnpjs)

// router.post("/adicionarcnpjcliente/:id", adicionar_cnpj)

// router.put("/atualizarcnpjcliente/:id", atualizar_cnpj)

router.delete("/excluircnpjcliente/:id", excluir_cnpj)

export default router;