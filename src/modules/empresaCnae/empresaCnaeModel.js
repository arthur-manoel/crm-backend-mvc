import db from "../../database/db.js";

export const empresaCnaeModel = {

    async excluirEmpresaCnae(idCnpj, conn) {

        const sql = "DELETE FROM cnpj_cnae WHERE cnpj_id = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}