import express from "express";
import { login } from "./authControllers.js";
import { usuarios } from "../../controllers/usuarioControllers.js";
import { loginSchema } from "./auth.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();

router.post("/login", validateBody(loginSchema), login);

export default router;
