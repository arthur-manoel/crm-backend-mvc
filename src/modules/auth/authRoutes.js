import express from "express";
import { createUser, login } from "./authControllers.js";
import { createUserSchema, loginSchema } from "./auth.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();

router.post(
    "/login", 
    validateBody(loginSchema), 
    login
);

router.post(
  "/register",
  validateBody(createUserSchema),
  createUser
);
export default router;
