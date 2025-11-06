import db from "../database/db.js";

const documentos = async (req, res) => {

    try {

        const { cliente_id } = req.params;

        const sql = "SELECT link from geracao_link WHERE cliente_id = ?";

        const [rows] = await db.execute(sql, [cliente_id])

        res.json(rows)

    } catch (error) {
    res.status(500).json({ error: err.message });
    }

}

export { documentos };