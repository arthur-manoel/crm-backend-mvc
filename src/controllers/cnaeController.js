import db from "../database/db.js";  // este db agora é um pool.promise()

// listar níveis
const listarCnae = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM cnae");
    res.json(rows); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// adicionar nível
const adicionarCnae = async (req, res) => {
  const { nome, numero } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO cnae (nome, numero) VALUES (?, ?)",
      [nome, numero]
    );
    res.status(201).json({
      message: "CNAE criado com sucesso!",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// editar nível
const editarCnae = async (req, res) => {
  const { nome,  } = req.body;
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "UPDATE cnae SET nome = ? WHERE id = ?",
      [nome, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cnae não encontrado" });
    }
    res.json({ message: "Cnae atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// excluir nível
const excluirCnae = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      "DELETE FROM cnae WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cnae não encontrado" });
    }
    res.json({ message: "Cnae excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { listarCnae, adicionarCnae, editarCnae, excluirCnae };
