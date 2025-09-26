import express from "express";
import { atividades_cliente } from "../controllers/atividadesController.js";

const router = express.Router();

router.get("/atividades_cliente/:id", atividades_cliente);

export default router;