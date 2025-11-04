import db from "../database/db.js";

const links = async (req, res) => {

    try {
        
        const sql = "SELECT * FROM geracao_link";

        const [rows] = await db.execute(sql);

        res.json(rows);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

export { links };