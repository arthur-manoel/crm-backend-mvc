import db from "../database/db.js";

const dashboard = async (req, res) => {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM cliente) AS totalClientes, 
        (SELECT COUNT(*) FROM cnpj) AS totalCNPJS,
        (SELECT COUNT(status) FROM status_link WHERE status = 'ativo') AS totalAtivos,
        (SELECT COUNT(status) FROM status_link WHERE status = 'pendente') AS totalPendentes,
        (SELECT COUNT(*) FROM processo WHERE id_tipo_processo = 50) AS totalAberturaCnpj,
        (SELECT COUNT(*) FROM processo WHERE id_tipo_processo = 51) AS totalAlteracaoCnpj,
        (SELECT COUNT(*) FROM processo WHERE id_tipo_processo = 52) AS totalFechamentoCnpj
    `;

    const [rows] = await db.query(sql);

    if (!rows || rows.length === 0) {

      return res.status(200).json({
        totalClientes: 0,
        totalCNPJS: 0,
        totalAtivos: 0,
        totalPendentes: 0,
        totalAberturaCnpj: 0,
        totalAlteracaoCnpj: 0,
        totalFechamentoCnpj: 0
      });
    }

    const { totalClientes, totalCNPJS, totalAtivos, totalPendentes, totalAberturaCnpj, totalAlteracaoCnpj, totalFechamentoCnpj } = rows[0];
    
    res.json({ totalClientes, totalCNPJS, totalAtivos, totalPendentes, totalAberturaCnpj, totalAlteracaoCnpj, totalFechamentoCnpj });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const qtd_tiposProcesso = async (req, res) => {

  try {
    const sql = `
    SELECT
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "abertura) AS totalAbertos, 
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "alteração") AS totalAlterados,
        (SELECT COUNT(*) FROM tipo_processo WHERE tipo = "fechamento") AS totalFechados
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

const tipos_processo = async (req, res) => {
  
  try {
    
    const sql = "SELECT * FROM tipo_processo";

    const [rows] = await db.execute(sql);

    res.json(rows);

  } catch (error) {
    return res.status(500).json({error: error.message})
  }

}

const clientes_detalhados = async (req, res) => {

  try {
    const sql = `
      SELECT 
        cl.id_cliente,
        cl.nome AS cliente,
        cl.gmail AS email,
        c.numero_cnpj AS CNPJ,
        c.id_cnpj AS id_CNPJ,
        c.nome AS nome_fantasia,
        c.data_criacao
      FROM cliente cl
      LEFT JOIN cliente_cnpj cc ON cl.id_cliente = cc.cliente_id
      LEFT JOIN cnpj c ON cc.cnpj_id = c.id_cnpj;
    `;

    const [rows] = await db.query(sql);

    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }

    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar clientes detalhados:", error);
    res.status(500).json({ error: error.message });
  }
};


export { dashboard, qtd_tiposProcesso, tipos_processo, clientes_detalhados };
