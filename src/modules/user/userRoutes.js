import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";

import { listUsers, patchUser } from "./userControllers.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { patchUserSchema } from "./user.schema.js";
import { validateBody } from "../../middlewares/validateBody.js";

const router = express.Router();


router.get(
  "/users",
  verifyToken,
  listUsers
);

router.patch(
  "/users/me",
  verifyToken,
  validateBody(patchUserSchema),
  patchUser
)

export default router;
