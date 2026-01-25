import db from "../database/db.js";

const processos = async (req, res) => {
  try {
    const sql = `
      SELECT 
        p.*, 
        t.tipo,
        g.data_expiracao,
        s.status
      FROM processo p
      JOIN tipo_processo t 
        ON p.id_tipo_processo = t.id_tipo_processo
      JOIN geracao_link g
        ON p.geracao_link_id = g.id_geracao_link
      JOIN status_link s
        ON g.id_geracao_link = s.geracao_link_id
    `;

    const [rows] = await db.execute(sql);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const processo = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM processo WHERE id_processo = ?";
    const [rows] = await db.execute(sql, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { processos, processo };