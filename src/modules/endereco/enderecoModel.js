import db from "../../database/db.js";

export const enderecoModel = {

    async buscarPorId(idEndereco) {

        const sql = "SELECT * FROM endereco WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [idEndereco]);

        return rows[0] || null;
        
    },

    async buscarEndereco(cnpjId, clienteId) {

        const sql = `
        SELECT * FROM endereco
        WHERE id_cliente = ? 
        AND id_cnpj = ?
        `;

        const [rows] = await db.execute(sql, [clienteId, cnpjId]);

        return rows[0] || null;
    },

    async buscarVinculo(idCliente, idCnpj) {

        const sql = "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cliente_id = ? AND cnpj_id = ?";

        const [rows] = await db.execute(sql, [idCliente, idCnpj]);
        
        return rows[0] || null;
    },

    async criarEndereco(cnpjId, clienteId, cep, rua, numero, complemento, bairro, cidade, estado) {

        const sql = `
            INSERT INTO endereco (id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const [rows] = await db.execute(sql, [cnpjId, clienteId, cep, rua, numero, complemento, bairro, cidade, estado]);

        return { id: rows.insertId, cnpjId, clienteId, cep, cidade, estado, bairro, rua, numero, complemento };

    },

    async validarEndereco(idEndereco, clienteId, cnpjId) {

        const sql = `
            SELECT *
            FROM endereco
            WHERE id_endereco = ?
            AND id_cliente = ?
            AND id_cnpj = ?
        `;

        const [rows] = await db.execute(sql, [idEndereco, clienteId, cnpjId]);

        return rows[0] || null;

    },

    async validarDuplicidade(idEndereco, cnpjId, cep, rua, numero, complemento, bairro, cidade, estado) {

        const sql = `
        SELECT id_endereco
        FROM endereco
        WHERE id_endereco != ? AND id_cnpj = ? AND cep = ? AND rua = ? AND numero = ? AND complemento <=> ? AND bairro = ? AND cidade = ? AND estado = ?
        `;

        const [rows] = await db.execute(sql, [idEndereco, cnpjId, cep, rua, numero, complemento, bairro, cidade, estado]);

        return rows[0] || null;

    },
    async atualizarEndereco(idEndereco, campos) {

        const sets = [];
        const values = [];

        for (const [key, value] of Object.entries(campos)) {
            sets.push(`${key} = ?`);
            values.push(value)
        }

        if (sets.length === 0) return 0;

        const sql = `
            UPDATE endereco
            SET ${sets.join(", ")}
            WHERE id_endereco = ?
        `;

        values.push(idEndereco);

        const [rows] = await db.execute(sql, values);

        return rows.affectedRows;
    },

    async excluirEndereco(idCnpj, conn) {

        const sql = "DELETE FROM endereco WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}