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

    async buscarVinculoEmpresa(idVinculo) {

        const sql = "SELECT cliente_id, cnpj_id FROM cliente_cnpj WHERE id_cliente_cnpj = ?";

        const [rows] = await db.execute(sql, [idVinculo]);

        return rows[0] || null;
    },
    
    async buscarPorClienteECnpj(clienteId, cnpjId, idIgnorar = null) {

        let sql = `
            SELECT id_cliente_cnpj
            FROM cliente_cnpj
            WHERE cliente_id = ? AND cnpj_id = ?
        `;

        const params = [clienteId, cnpjId];

        if (idIgnorar) {
            sql += ' AND id_cliente_cnpj != ?';
            params.push(idIgnorar);
        }

        const [rows] = await db.execute(sql, params);
        return rows[0] || null;

        },
        
    async criarEmpresaCliente(clienteId, cnpjId) {

        const sql = "INSERT INTO cliente_cnpj (cliente_id, cnpj_id) VALUES (?, ?)";

        const [rows] = await db.execute(sql, [clienteId, cnpjId]);

        return rows;
    },

    async atualizarClienteEmpresa(idVinculo, clienteId, cnpjId) {

        const sql = `
            UPDATE cliente_cnpj
            SET cliente_id = ?
            WHERE id_cliente_cnpj = ?
        `;

        const [rows] = await db.execute(sql, [clienteId, idVinculo]);

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