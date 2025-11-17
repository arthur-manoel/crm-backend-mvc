import db from "../database/db.js";

const documentos = async (req, res) => {

    try {

        const { cliente_id } = req.params;

        const sql = "SELECT * FROM `documento` as d INNER JOIN `tipo_documento` as td on d.tipo_documento_id = td.id_tipo_documento";

        const [rows] = await db.execute(sql, [cliente_id])

        res.json(rows)

    } catch (error) {
    res.status(500).json({ error: error.message });
    }

}

const documentos_solicitados = async (req, res) => {

    try {

        const { ids } = req.body;
        
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: "Envie um array de ids" });
        }

        const sql = `
            SELECT nome 
            FROM tipo_documento 
            WHERE id_tipo_documento IN (${ids.map(() => '?').join(',')})
        `;

        const [rows] = await db.execute(sql, ids)

        res.json(rows)

    } catch (error) {
    res.status(500).json({ error: error.message });
    }

}

export { documentos, documentos_solicitados };
