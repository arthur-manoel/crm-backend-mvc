import { DomainError } from "../../errors/DomainError.js";
import { authService } from "./authService.js";

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json(result);

  } catch (error) {

    if (error instanceof DomainError) {
    return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {

  try {

    const { name, email, phone, password, role } = req.body;

    const newUser = await authService.create({
      name,
      email,
      phone,
      password,
      role
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {

    if (error instanceof DomainError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export { login, createUser };
