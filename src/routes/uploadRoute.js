import { uploadArquivos } from "../controllers/uploadController.js";
import express from "express";

const router = express.Router();

router.post("/uploadarquivo", uploadArquivos);

export default router