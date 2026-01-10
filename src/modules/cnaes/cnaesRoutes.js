import express from "express";
import { listarCnaes } from "./cnaesController.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";

const router = express.Router();

router.get("/cnaes", verifyToken, listarCnaes);

export default router;
