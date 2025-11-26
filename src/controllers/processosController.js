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

const criarProcesso = async (req, res) => {
  const { id_cliente, id_cnpj, status } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;

    const linkGerado = `https://facilita-compet.vercel.app/abrir-empresa/documentos/${id_cliente}`;

    const dataExpiracao = new Date();

    dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
    const dataExpiracaoFormatada = dataExpiracao.toISOString().slice(0, 19).replace("T", " ");

    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, cliente_id, cliente_cnpj_id, data_expiracao, tipo_processo_id)
       VALUES (?, ?, ?, ?, 50)`,
      [linkGerado, id_cliente, id_cliente_cnpj, dataExpiracaoFormatada]
    );

    const geracao_link_id = linkResult.insertId;

    await db.execute(
      `INSERT INTO status_link (status_link, geracao_link_id)
       VALUES (?, ?)`,
      [status || "pendente", geracao_link_id]
    );

    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, 50, NOW(), ?)`,
      [id_cliente, id_cnpj, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo criado com sucesso!",
      link: linkGerado,
      data_expiracao: dataExpiracaoFormatada
    });

  } catch (error) {
    console.error("Erro ao criar processo:", error);
    res.status(500).json({ error: "Erro ao criar processo" });
  }
};

const excluirprocesso = async (req, res) => {

  const { id_cliente, id_cnpj, status } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;

    const linkGerado = `https://facilita-compet.vercel.app/abrir-empresa/documentos/${id_cliente}`;

    const dataExpiracao = new Date();

    dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
    const dataExpiracaoFormatada = dataExpiracao.toISOString().slice(0, 19).replace("T", " ");

    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, cliente_id, cliente_cnpj_id, data_expiracao, tipo_processo_id)
       VALUES (?, ?, ?, ?, 52)`,
      [linkGerado, id_cliente, id_cliente_cnpj, dataExpiracaoFormatada]
    );

    const geracao_link_id = linkResult.insertId;

    await db.execute(
      `INSERT INTO status_link (status_link, geracao_link_id)
       VALUES (?, ?)`,
      [status || "pendente", geracao_link_id]
    );

    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, 52, NOW(), ?)`,
      [id_cliente, id_cnpj, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo de exclusão criado com sucesso!",
      link: linkGerado,
      data_expiracao: dataExpiracaoFormatada
    });

  } catch (error) {
    console.error("Erro ao criar processo de exclusão:", error);
    res.status(500).json({ error: "Erro ao criar processo de exclusão" });
  }
};

const atualizarprocesso = async (req, res) => {

  const { id_cliente, id_cnpj, status } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;
    
    const linkGerado = `https://facilita-compet.vercel.app/abrir-empresa/documentos/${id_cliente}`;

    const dataExpiracao = new Date();

    dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
    const dataExpiracaoFormatada = dataExpiracao.toISOString().slice(0, 19).replace("T", " ");

    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, cliente_id, cliente_cnpj_id, data_expiracao, tipo_processo_id)
       VALUES (?, ?, ?, ?, 51)`,
      [linkGerado, id_cliente, id_cliente_cnpj, dataExpiracaoFormatada]
    );

    const geracao_link_id = linkResult.insertId;

    await db.execute(
      `INSERT INTO status_link (status_link, geracao_link_id)
       VALUES (?, ?)`,
      [status || "pendente", geracao_link_id]
    );

    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, 51, NOW(), ?)`,
      [id_cliente, id_cnpj, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo de atualização criado com sucesso!",
      link: linkGerado,
      data_expiracao: dataExpiracaoFormatada
    });

  } catch (error) {
    console.error("Erro ao criar processo de atualização:", error);
    res.status(500).json({ error: "Erro ao criar processo de atualização" });
  }
};

export { processos, processo, criarProcesso, atualizarprocesso, excluirprocesso };
