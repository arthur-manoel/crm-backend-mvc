import { userService } from "./userService.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const listUsers = async (req, res) => {

  try {

    const users = await userService.list();

    return res.json({ data: users });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const patchUser = async (req, res) => {

  try {

    const userId = req.user.id;

    const validatedData = req.body;

    await userService.patchUser(userId, validatedData);

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message })
    }

    return res.status(500).json({ error: "Internal server error" })
  }
}

const deleteUser = async (req, res) => {

  try {

    const userId = req.user.id;

    const validatedData = req.body;

    await userService.deleteUser(userId, validatedData);

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export { listUsers, patchUser, deleteUser }