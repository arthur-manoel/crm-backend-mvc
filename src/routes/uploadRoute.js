import { uploadArquivos } from "../controllers/uploadController.js";
import express from "express";

const router = express.Router();

router.post("/uploadarquivo/:cliente_id", uploadArquivos);

export default router