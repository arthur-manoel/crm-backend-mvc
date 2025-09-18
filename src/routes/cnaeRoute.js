import express from "express";
import {
  listarCnae,
  adicionarCnae,
  editarCnae,
  excluirCnae,
} from "../controllers/cnaeController.js";

const router = express.Router();

router.get("/Cnae", listarCnae);
router.post("/Cnae", adicionarCnae);
router.put("/Cnae/:id", editarCnae);
router.delete("/Cnae/:id", excluirCnae);

export default router;
