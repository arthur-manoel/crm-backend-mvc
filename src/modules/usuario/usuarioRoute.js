import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { usuarioSchema } from "./usuario.schema.js";
import { cadastro } from "./usuarioControllers.js";

const router = express.Router();

router.post("/cadastro", validateBody(usuarioSchema), cadastro);

export default router;