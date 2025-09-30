import db from "../database/db.js";

const dashboard = async (req, res) => {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM cliente) AS totalClientes, 
        (SELECT COUNT(*) FROM cnpj) AS totalCNPJS,
        (SELECT SUM(ativo) FROM cnpj_status) AS totalAtivos,
        (SELECT SUM(pendente) FROM cnpj_status) AS totalPendentes
    `;
    const [rows] = await db.query(sql);

    if (!rows || rows.length === 0) {
      return res.status(200).json({ totalClientes: 0, totalCNPJS: 0, totalAtivos: 0, totalPendentes: 0 });
    }
    const { totalClientes, totalCNPJS, totalAtivos, totalPendentes } = rows[0];
    
    res.json({ totalClientes, totalCNPJS, totalAtivos, totalPendentes });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const tiposProcesso = async (req, res) => {

  try {
    const sql = `
    SELECT
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "aberto") AS totalAbertos, 
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "alterados") AS totalAlterados,
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "fechados") AS totalFechados
    `
    const [rows] = await db.query(sql);
    
    if (!rows || rows.length == 0) {
      return res.status(200).json({totalAberto: 0, totalAlterados: 0, totalFechados: 0})
    }

    const { totalAbertos, totalAlterados, totalFechados } = rows[0]

    res.json({totalAbertos, totalAlterados, totalFechados})

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

}

export { dashboard, tiposProcesso };