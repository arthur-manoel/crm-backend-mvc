import db from "../../database/db.js";

export const empresaClienteModel = {

    async excluirEmpresaCliente(idCnpj, conn) {

        const sql = "DELETE FROM cliente_cnpj WHERE cnpj_id = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}