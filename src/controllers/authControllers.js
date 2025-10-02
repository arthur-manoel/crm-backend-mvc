import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/db.js";  // agora é o pool.promise

dotenv.config();

const SECRET = process.env.SECRET;

const login = async (req, res) => {
  const { Email, Senha } = req.body;

  const sql = `
        SELECT u.*, n.nome AS role FROM usuario u JOIN nivel_usuario n ON u.nivel_usuario_id = n.id_nivel_usuario WHERE u.Email = ?
  `;

  try {
    const [rows] = await db.execute(sql, [Email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(Senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Informações incorretas" });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.Email, role: usuario.role },
      SECRET,
      { expiresIn: "30d" }
    );

    res.json({
  token,
  user: {
    id: usuario.id_usuario,
    email: usuario.Email,
    role: usuario.role
  }
});

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

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido" });
    }



  req.user = decoded;

  const newToken = jwt.sign({ id: decoded.id }, SECRET, {
      expiresIn: "1h",
    });

  res.setHeader("Authorization", "Bearer " + newToken);


  next()

  });
}

export { login, VerificarToken };
