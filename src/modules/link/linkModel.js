import db from "../../database/db.js";

export const linkModel = {

    async links(clienteCnpjId) {

        const sql = "SELECT * FROM geracao_link WHERE cliente_cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteCnpjId]);

        return rows;
    },

    async isCnpjAssociated(clienteCnpjId, cnpjId) {

        const sql = "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE id_cliente_cnpj = ? AND cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteCnpjId, cnpjId]);

        return rows[0] || null;
    },
}