import { VerificarToken } from "../controllers/authControllers.js";

import {
    cadastrarCNPJ, 
    totalCNPJS, 
    atualizarCNPJ, 
    excluirCNPJ
} from "../controllers/cnpjController.js";

import express from "express";

const router = express.Router();

router.get("/totalcnpjs", VerificarToken, totalCNPJS);

router.post("/cadastrarcnpj", VerificarToken, cadastrarCNPJ);

router.put("/atualizarcnpj/:id", VerificarToken, atualizarCNPJ);

router.delete("/excluircnpj/:id", VerificarToken, excluirCNPJ);

export default router;