import db from "../database/db.js";

const processos = async (req, res) => {

    try {
        
        const sql = "SELECT * FROM processo";
        const [rows] = await db.execute(sql);

        res.json(rows);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const processo = async (req, res) => {

    try {
        
        const { id } = req.params;

        const sql = "SELECT * FROM processo WHERE id_processo = ?";
        const [rows] = await db.execute(sql, [id]);

        res.json(rows);
   
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const criarProcesso = async (req, res) => {
  
  const { id_cliente, id_cnpj, tipo_link_id, cnae_id } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;


    const linkGerado = `https://projeto-back-ten.vercel.app/adicionarcnpjcliente/${id_cliente}`;


    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, tipo_link_id, cliente_id, cliente_cnpj_id, cnae_id)
       VALUES (?, 1, ?, ?, ?)`,
      [linkGerado, id_cliente, id_cliente_cnpj, cnae_id]
    );

    const geracao_link_id = linkResult.insertId;


    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, 50, NOW(), ?)`,
      [id_cliente, id_cnpj, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo criado com sucesso!",
      link: linkGerado
    });

  } catch (error) {
    console.error("Erro ao criar processo:", error);
    res.status(500).json({ error: "Erro ao criar processo" });
  }
};


const excluirprocesso = async (req, res) => {
  const { id_cliente, id_cnpj, cnae_id } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;


    const linkGerado = `https://projeto-back-ten.vercel.app/excluircnpjcliente/${id_cliente}`;


    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, tipo_link_id, cliente_id, cliente_cnpj_id, cnae_id)
       VALUES (?, ?, ?, ?, ?)`,
      [linkGerado, 3, id_cliente, id_cliente_cnpj, cnae_id] 
    );

    const geracao_link_id = linkResult.insertId;

    
    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, ?, NOW(), ?)`,
      [id_cliente, id_cnpj, 52, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo de exclusão criado com sucesso!",
      link: linkGerado
    });

  } catch (error) {
    console.error("Erro ao criar processo de exclusão:", error);
    res.status(500).json({ error: "Erro ao criar processo de exclusão" });
  }
};


const atualizarprocesso = async (req, res) => {

  const { id_cliente, id_cnpj, cnae_id } = req.body;

  try {

    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;

    const linkGerado = `https://projeto-back-ten.vercel.app/atualizarcnpjcliente/${id_cliente}`;

    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, tipo_link_id, cliente_id, cliente_cnpj_id, cnae_id)
       VALUES (?, ?, ?, ?, ?)`,
      [linkGerado, 2, id_cliente, id_cliente_cnpj, cnae_id]
    );

    const geracao_link_id = linkResult.insertId;

    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, ?, NOW(), ?)`,
      [id_cliente, id_cnpj, 51, geracao_link_id]
    );

    res.status(201).json({
      message: "Processo de atualização criado com sucesso!",
      link: linkGerado
    });

  } catch (error) {
    console.error("Erro ao criar processo de atualização:", error);
    res.status(500).json({ error: "Erro ao criar processo de atualização" });
  }
};

export { processos, processo, criarProcesso, atualizarprocesso, excluirprocesso };