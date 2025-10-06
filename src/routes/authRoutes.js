import express from "express";
import { login } from "../controllers/authControllers.js";
import { cadastro, usuarios } from "../controllers/usuarioControllers.js";

const router = express.Router();

router.get("/usuarios", usuarios)
router.post("/login", login);
router.post("/cadastro", cadastro);


export default router;
