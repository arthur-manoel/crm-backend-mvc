import db from "../database/db.js";

const totalCNPJS = async (req, res) => {
    
  try {

    const [rows] = await db.execute("SELECT * FROM cnpj");

    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};


const cadastrarCNPJ = async (req, res) => {

  const { Nome } = req.body;
  try {
    const sql = "INSERT INTO cnpj (nome) VALUES (?)"

    const [result] = await db.execute(sql, [Nome]);

    res.status(201).json({ message: "CNPJ cadastrado com sucesso!", id: result.insertId });

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};


const atualizarCNPJ = async (req, res) => {

  const { id } = req.params;
  const { Nome } = req.body;

  try {

    const [result] = await db.execute("UPDATE cnpj SET nome = ? WHERE id_cnpj = ?", [Nome, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "CNPJ não encontrado" });
    }

    res.json({ message: "CNPJ atualizado com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};


const excluirCNPJ = async (req, res) => {

  const { id } = req.params;

  try {

    const [result] = await db.execute("DELETE FROM cnpj WHERE id_cnpj = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "CNPJ não encontrado" });
    }

    res.json({ message: "CNPJ excluído com sucesso!" });

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

export { cadastrarCNPJ, totalCNPJS, atualizarCNPJ, excluirCNPJ };
