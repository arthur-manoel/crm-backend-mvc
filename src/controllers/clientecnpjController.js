import db from "../database/db.js";
import router from "../routes/cliente_cnpjRoute.js";

const cliente_cnpjs = async (req, res) => {

    try {

        const { id } = req.params;

        const sql = `SELECT cnpj.*
                    FROM cnpj
                    INNER JOIN cliente_cnpj ON cnpj.id_cnpj = cliente_cnpj.cnpj_id
                    WHERE cliente_cnpj.cliente_id = ?;`;

        const [rows] = await db.execute(sql, [id]);

        res.json(rows)

    } catch (error) {
        res.status(500).json({error: error.message})
    };


};

const adicionar_cnpj = async (req, res) => {

    try {
        const { id } = req.params;
        const { cnpj_id } = req.body;
        
        const [rows] = await db.execute(
        "INSERT INTO cliente_cnpj (cliente_id, cnpj_id) VALUES (?, ?)",
        [id, cnpj_id]
    );
        
        res.json(rows)

    } catch (error) {
        if (error) return res.status(500).json({error: error.message});
    }

};

const atualizar_cnpj = async (req, res) => {

    try {

        const { id } = req.params;
        const { cnpj_id_antigo, cnpj_id_novo } = req.body;

        const [rows] = await db.execute(
            "UPDATE cliente_cnpj SET cnpj_id = ? WHERE cliente_id = ? AND cnpj_id = ?",
            [cnpj_id_novo, id, cnpj_id_antigo]
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const excluir_cnpj = async (req, res) => {

    try {
        
        const { id } = req.params;
        const { cnpj_id } = req.body;

        const [rows] = await db.execute(
            "DELETE FROM cliente_cnpj WHERE cliente_id = ? AND cnpj_id = ?",
            [id, cnpj_id]
        );

        res.json(rows);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export {cliente_cnpjs, adicionar_cnpj, atualizar_cnpj, excluir_cnpj};