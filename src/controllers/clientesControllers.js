import db from "../database/db.js";  // agora é o pool.promise()

const clientes = async (req, res) => {
  try {
    const userId = req.user.id;
    const sql = "SELECT * FROM cliente WHERE Usuario_idUsuario = ?";
    const [rows] = await db.execute(sql, [userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

const cadastrarcliente = async (req, res) => {
  try {
    const { Nome, Fone, CPF } = req.body;
    const userId = req.user.id;
    const sql = "INSERT INTO cliente (Nome, Fone, CPF, Usuario_idUsuario) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(sql, [Nome, Fone, CPF, userId]);
    res.status(201).json({ message: "Cliente cadastrado com sucesso!", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

const excluircliente = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "DELETE FROM Cliente WHERE idCliente = ?";
    const [result] = await db.execute(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

const atualizarcliente = async (req, res) => {
  try {
    const { Nome, Fone, CPF } = req.body;
    const { id } = req.params;
    const userId = req.user.id;
    const sql = `
      UPDATE Cliente
      SET Nome = ?, Fone = ?, CPF = ?
      WHERE idCliente = ? AND Usuario_idUsuario = ?
    `;
    const [result] = await db.execute(sql, [Nome, Fone, CPF, id, userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado ou não pertence ao usuário" });
    }
    res.json({ message: "Cliente atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

export { clientes, cadastrarcliente, excluircliente, atualizarcliente };
