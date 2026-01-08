import db from "../../database/db.js";

export const empresaClienteModel = {

    async buscarVinculoEmpresa(clienteId, cnpjId) {

        const sql = "SELECT cliente_id, cnpj_id FROM cliente_cnpj WHERE cliente_id = ? AND cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteId, cnpjId])

        return rows[0] || null;
    },

    async criarEmpresaCliente(clienteId, cnpjId) {

        const sql = "INSERT INTO cliente_cnpj (cliente_id, cnpj_id) VALUES (?, ?)";

        const [rows] = await db.execute(sql, [clienteId, cnpjId]);

    },

    async excluirEmpresaCliente(idCnpj, conn) {

        const sql = "DELETE FROM cliente_cnpj WHERE cnpj_id = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}