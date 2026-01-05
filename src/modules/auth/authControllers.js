import { DomainError } from "../../errors/domainError.js";
import { authService } from "./authService.js";

const login = async (req, res) => {

  try {

    const { email, senha } = req.body;

    const result = await authService.login(email, senha);

    res.json(result);

  } catch (error) {

    if (error instanceof DomainError) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    return res.status(500).json({ error: "Erro interno" });
  }
};

const usuarios = async (req, res) => {

  

}

export { login };
