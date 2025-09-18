// niveisUsuariosController.js
import db from "../database/db.js";  // este db agora é um pool.promise()

// listar níveis
const listarNiveis = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM nivel_usuario");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// adicionar nível
const adicionarNivel = async (req, res) => {
  const { nome } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO nivel_usuario (nome) VALUES (?)",
      [nome]
    );
    res.status(201).json({
      message: "Nível de usuário criado com sucesso!",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// editar nível
const editarNivel = async (req, res) => {
  const { nome, descricao } = req.body;
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "UPDATE nivel_usuario SET nome = ?, descricao = ? WHERE id = ?",
      [nome, descricao, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nível de usuário não encontrado" });
    }
    res.json({ message: "Nível de usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// excluir nível
const excluirNivel = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "DELETE FROM nivel_usuario WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Nível de usuário não encontrado" });
    }
    res.json({ message: "Nível de usuário excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { listarNiveis, adicionarNivel, editarNivel, excluirNivel };
