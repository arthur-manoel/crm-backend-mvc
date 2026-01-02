import { authService } from "../services/authService.js";

const login = async (req, res) => {

  try {

    const { Email, Senha } = req.body;

    const result = await authService.login(Email, Senha);

    res.json(result);

  } catch (error) {

    if (error.message === "INVALID_CREDENTIALS") {
    return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    return res.status(500).json({ error: "Erro interno" });
  }
};


export { login };
