import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";

import { listUsers } from "./userControllers.js";

const router = express.Router();


router.get(
  "/users",
  verifyToken,
  listUsers
);

export default router;
