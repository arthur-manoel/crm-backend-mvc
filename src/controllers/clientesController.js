import db from "../database/db.js";  // agora é o pool.promise()

const clientes = async (req, res) => {
  try {
    const userId = req.user.id;
    const sql = "SELECT * FROM cliente WHERE usuario_id = ?";
    const [rows] = await db.execute(sql, [userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

const cadastrarcliente = async (req, res) => {
  try {
    const { Nome, Fone, CPF, data_nascimento, cep, cidade, estado, rg, gmail, numero_casa, endereco } = req.body;
    const userId = req.user.id;

    const sql = "INSERT INTO cliente (nome, fone, cpf, usuario_id, data_nascimento, cep, cidade, estado, rg, gmail, numero_casa, endereco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const [result] = await db.execute(sql, [Nome, Fone, CPF, userId, data_nascimento, cep, cidade, estado, rg, gmail, numero_casa, endereco]);
    res.status(201).json({ message: "Cliente cadastrado com sucesso!", id: result.insertId });

  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

const excluircliente = async (req, res) => {

  try {

    const id = req.params.id;

    const sql = "DELETE FROM cliente WHERE id_cliente = ?";
    
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

    const { Nome, Fone, CPF, cep, cidade, estado, rg, gmail } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const sql = `
      UPDATE cliente
      SET nome = ?, fone = ?, cpf = ?, cep = ?, cidade = ?, estado = ?, rg = ?, gmail = ?
      WHERE id_cliente = ? AND usuario_id = ?
    `;
    
    const [result] = await db.execute(sql, [Nome, Fone, CPF, cep, cidade, estado, rg, gmail, id, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado ou não pertence ao usuário" });
    }
    res.json({ message: "Cliente atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor", details: err.message });
  }
};

export { clientes, cadastrarcliente, excluircliente, atualizarcliente };
