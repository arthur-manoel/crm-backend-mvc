import db from "../database/db.js";

const listar_cnaes_cliente = async (req, res) => {

    try {

        const { id } = req.params;

        const sql = `
            SELECT DISTINCT cnae.id_cnae, cnae.nome AS nome_cnae, cnpj.nome AS nome_cnpj
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


const adicionar_cnae_cliente = async (req, res) => {
    
    try {

        const { cnpj_id, cnae_id } = req.body;

        const [rows] = await db.execute(
            "INSERT INTO cnpj_cnae (cnpj_id, cnae_id) VALUES (?, ?)",
            [cnpj_id, cnae_id]
        );

        res.json({ message: "CNAE adicionado com sucesso", insertId: rows.insertId });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const atualizar_cnae_cliente = async (req, res) => {

    try {
        const { cnpj_id, cnae_id_antigo, cnae_id_novo } = req.body;

        const [rows] = await db.execute(
            "UPDATE cnpj_cnae SET cnae_id = ? WHERE cnpj_id = ? AND cnae_id = ?",
            [cnae_id_novo, cnpj_id, cnae_id_antigo]
        );

        res.json({ message: "CNAE atualizado com sucesso", affectedRows: rows.affectedRows });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const excluir_cnae_cliente = async (req, res) => {

    try {

        const { cnpj_id, cnae_id } = req.body;

        const [rows] = await db.execute(
            "DELETE FROM cnpj_cnae WHERE cnpj_id = ? AND cnae_id = ?",
            [cnpj_id, cnae_id]
        );

        res.json({ message: "CNAE excluído com sucesso", affectedRows: rows.affectedRows });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { listar_cnaes_cliente, adicionar_cnae_cliente, atualizar_cnae_cliente, excluir_cnae_cliente };
