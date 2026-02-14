import { userService } from "./userService.js";
import { DomainError } from "../../errors/DomainError.js";

export const listUsers = async (req, res) => {

  try {

    const users = await userService.list();

    return res.json({ data: users });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

