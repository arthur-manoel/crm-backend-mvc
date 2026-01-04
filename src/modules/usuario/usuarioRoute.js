import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { cadastroSchema } from "./usuario.schema.js";
import { cadastro } from "./usuarioControllers.js";

const router = express.Router();

router.post("/cadastro", validateBody(cadastroSchema), cadastro);

export default router;