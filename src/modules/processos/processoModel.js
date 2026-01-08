import db from "../../database/db.js";

export const processoModel = {

    async excluirProcesso(idCnpj, conn) {

        const sql = "DELETE FROM processo WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    },
}