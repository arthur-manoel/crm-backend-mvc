import bcrypt from "bcrypt";
import db from "../database/db.js";  // este `db` agora é um pool promise

const usuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Usuario");
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cadastro = async (req, res) => {
  const { Nome, Email, Senha } = req.body;

  try {
    const senhaHashed = await bcrypt.hash(Senha, 10);
    const sql = "INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)";

    const [result] = await db.execute(sql, [Nome, Email, senhaHashed]);

    res.status(201).json({
      message: "Cliente cadastrado com sucesso!",
      id: result.insertId,
    });
  } catch (err) {
    // se for duplicado de email
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: err.message });
  }
};

export { usuarios, cadastro };
