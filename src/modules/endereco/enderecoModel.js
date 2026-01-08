import db from "../../database/db.js";

export const enderecoModel = {

    async excluirEndereco(idCnpj, conn) {

        const sql = "DELETE FROM endereco WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}