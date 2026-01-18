import express from "express";
import { 
    listar_cnaes_cliente,
    adicionar_cnae_cliente,
    atualizar_cnae_cliente,
    excluir_cnae_cliente
} from "../controllers/clienteCnaeController.js";

const router = express.Router();

// router.get("/cnaes_cliente/:id", listar_cnaes_cliente);
// router.post("/cnaes_cliente", adicionar_cnae_cliente);
// router.put("/cnaes_cliente", atualizar_cnae_cliente);
// router.delete("/cnaes_cliente", excluir_cnae_cliente);

export default router;
