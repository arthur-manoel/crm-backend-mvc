import express from "express";
import { createClient, listClients, updateClient, deleteClient } from "./clientControllers.js";
import { verifyToken } from "../../middlewares/tokenVerify.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { clientSchema } from "./client.schema.js";

const router = express.Router();

router.get("/clients", verifyToken, listClients);
router.post("/clients", verifyToken, validateBody(clientSchema), createClient);
router.put("/clients/:id", verifyToken, validateBody(clientSchema), updateClient);
router.delete("/clients/:id", verifyToken, deleteClient);

export default router;
