import express from "express";
import { verifyToken } from "../../middlewares/tokenVerify.js";

import { listUsers, patchUser,deleteUser } from "./userControllers.js";
import { patchUserSchema, deleteUserSchema } from "./user.schema.js";
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
);

router.delete(
  "/users/me",
  verifyToken,
  validateBody(deleteUserSchema),
  deleteUser
);

export default router;