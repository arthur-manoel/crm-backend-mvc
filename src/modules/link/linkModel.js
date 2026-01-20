import db from "../../database/db.js";

export const linkModel = {

    async links(clienteCnpjId) {

        const sql = "SELECT * FROM geracao_link WHERE cliente_cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteCnpjId]);

        return rows[0] || null;
    },

}