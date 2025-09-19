import db from "../database/db.js";

const dashboard = async (req, res) => {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM cliente) AS totalClientes, 
        (SELECT COUNT(*) FROM cnpj) AS totalCNPJS
    `;
    const [rows] = await db.query(sql);
    if (!rows || rows.length === 0) {
      return res.status(200).json({ totalClientes: 0, totalCNPJS: 0 });
    }
    const { totalClientes, totalCNPJS } = rows[0];
    res.json({ totalClientes, totalCNPJS });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default dashboard;
