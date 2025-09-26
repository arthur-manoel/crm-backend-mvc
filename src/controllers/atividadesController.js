import db from "../database/db.js";

const atividades_cliente = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT cnpj.nome AS nome_cnpj, cnae.nome AS nome_cnae
            FROM cliente_cnpj
            INNER JOIN cnpj ON cliente_cnpj.cnpj_id = cnpj.id_cnpj
            INNER JOIN cnpj_cnae ON cnpj.id_cnpj = cnpj_cnae.cnpj_id
            INNER JOIN cnae ON cnpj_cnae.cnae_id = cnae.id_cnae
            WHERE cliente_cnpj.cliente_id = ?;
        `;

        const [rows] = await db.execute(sql, [id]);
        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { atividades_cliente }