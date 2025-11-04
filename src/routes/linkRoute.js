import express from "express";
import { links } from "../controllers/linkController.js";
import { VerificarToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/links", VerificarToken, links);

export default router;