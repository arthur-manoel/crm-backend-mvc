import db from "../../database/db.js";

export const enderecoModel = {

    async buscarPorId(idEndereco) {

        const sql = "SELECT * FROM endereco WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [idEndereco]);

        return rows[0] || null;
        
    },

    async buscarEndereco(cnpjId, clienteId) {

        const sql = "SELECT id_endereco FROM endereco WHERE id_cnpj = ? AND id_cliente = ?";

        const [rows] = await db.execute(sql, [cnpjId, clienteId]);

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

    async excluirEndereco(idCnpj, conn) {

        const sql = "DELETE FROM endereco WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    }
}