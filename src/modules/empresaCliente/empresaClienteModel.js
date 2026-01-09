import db from "../../database/db.js";

export const empresaClienteModel = {

    async empresasCliente(clienteId) {

        const sql = `
            SELECT cnpj.*
            FROM cnpj
            INNER JOIN cliente_cnpj ON cnpj.id_cnpj = cliente_cnpj.cnpj_id
            WHERE cliente_cnpj.cliente_id = ?
            `;

        const [rows] = await db.execute(sql, [clienteId]);

        return rows;

    },

    async buscarVinculoEmpresa(clienteId, cnpjId) {

        const sql = "SELECT cliente_id, cnpj_id FROM cliente_cnpj WHERE cliente_id = ? AND cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteId, cnpjId])

        return rows[0] || null;
    },
    
    async buscarVinculoAutorizado(idClienteCnpj, userId) {

        const sql = `
        SELECT cc.id_cliente_cnpj
        FROM cliente_cnpj cc
        JOIN cliente c ON c.id_cliente = cc.cliente_id
        WHERE cc.id_cliente_cnpj = ?
        AND c.usuario_id = ?
        `;

        const [rows] = await db.execute(sql, [idClienteCnpj, userId]);

        return rows[0] || null;
    },
    async criarEmpresaCliente(clienteId, cnpjId) {

        const sql = "INSERT INTO cliente_cnpj (cliente_id, cnpj_id) VALUES (?, ?)";

        const [rows] = await db.execute(sql, [clienteId, cnpjId]);

        return rows;
    },

    async atualizarClienteEmpresa(clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo) {

        const sql = "UPDATE cliente_cnpj SET cliente_id = ?, cnpj_id = ? WHERE cliente_id = ? AND cnpj_id = ?";

        const [rows] = await db.execute(sql, [clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo]);

        return rows.affectedRows;
    },

    async excluirEmpresaCliente(idCnpj, conn) {

        const sql = "DELETE FROM cliente_cnpj WHERE cnpj_id = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    },

    async excluirVinculoPorId(idClienteCnpj, conn) {
        const sql = "DELETE FROM cliente_cnpj WHERE id_cliente_cnpj = ?";

        const [rows] = await conn.execute(sql, [idClienteCnpj]);

        return rows.affectedRows;
    }
}