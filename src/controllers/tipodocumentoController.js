import db from "../database/db.js";

const documentos = async (req, res) => {

    try {
        
        const sql = "SELECT nome FROM tipo_documento"

        const [rows] = await db.execute(sql)

        res.json(rows)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

export { documentos }