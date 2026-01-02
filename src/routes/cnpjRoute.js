// import { VerificarToken } from "../controllers/authControllers.js";

import {
    cadastrarCNPJ, 
    totalCNPJS, 
    atualizarCNPJ, 
    excluirCNPJ
} from "../controllers/cnpjController.js";

import express from "express";

const router = express.Router();

router.get("/totalcnpjs", totalCNPJS);

router.post("/cadastrarcnpj", cadastrarCNPJ);

router.put("/atualizarcnpj/:id", atualizarCNPJ);

router.delete("/excluircnpj/:id", excluirCNPJ);

export default router;