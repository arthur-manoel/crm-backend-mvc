import express from "express";
import { login } from "../controllers/authControllers.js";
import { usuarios } from "../controllers/usuarioControllers.js";

const router = express.Router();

router.post("/login", login);
router.get("/usuarios", usuarios)
// router.post("/cadastro", cadastro);


export default router;
