import bcrypt from "bcrypt";
import db from "../database/db.js";

const usuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuario");
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cadastro = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const senhaHashed = await bcrypt.hash(password, 10);

    let nivel_usuario_id;
    
    if (role === "client") {
  nivel_usuario_id = 1;
    }
    
    else if (role === "employee") {
  nivel_usuario_id = 2;
    } 

    else {
      return res.status(400).json({ error: "Role inválido" });
}
    const sql =
      "INSERT INTO usuario (Nome, Email, telefone, Senha, nivel_usuario_id) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.execute(sql, [
      name,
      email,
      phone,
      senhaHashed,
      nivel_usuario_id,
    ]);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      id: result.insertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: err.message });
  }
};

export { usuarios, cadastro };
