import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/db.js";  // agora é o pool.promise

dotenv.config();

const SECRET = process.env.SECRET;

const login = async (req, res) => {
  const { Email, Senha } = req.body;

  const sql = "SELECT * FROM Usuario WHERE Email = ?";

  try {
    const [rows] = await db.execute(sql, [Email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Informações incorretas" });
    }

    const token = jwt.sign(
      { id: usuario.idUsuario, email: usuario.Email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

function VerificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }
    req.user = payload;
    next();
  });
}

export { login, VerificarToken };
