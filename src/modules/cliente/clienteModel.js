import db from "../../database/db.js";

export const clienteModel = {

    async cadastrarCliente(dados) {

        const { nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro } = dados;

        const sql = "INSERT INTO cliente (nome, fone, cpf, usuario_id, data_nascimento, cep, cidade, estado, rg, gmail, numero_casa, endereco, complemento, rua, bairro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const [rows] = await db.execute(sql, [
            nome, 
            fone, 
            cpf, 
            userId, 
            data_nascimento, 
            cep, 
            cidade, 
            estado, 
            rg, 
            email, 
            numero_casa, 
            endereco,
            complemento,
            rua,
            bairro,
        ]);

    return { id: rows.insertId, ...dados };

    },

    async buscarCPF(cpf) {
        const sql = "SELECT * FROM cliente WHERE cpf = ?";

        const [rows] = await db.execute(sql, [cpf]);

        return rows[0] || null;
    },

    async buscarRG(rg) {
        const sql = "SELECT * FROM cliente WHERE rg = ?";

        const [rows] = await db.execute(sql, [rg]);
        
        return rows[0] || null;
    },

    async buscarEmail(email) {
        const sql = "SELECT * FROM cliente WHERE gmail = ?";

        const [rows] = await db.execute(sql, [email]);

        return rows[0] || null;
    },

    async buscarClientePorId(idCliente) {

        const sql = "SELECT id_cliente FROM cliente WHERE id_cliente = ?";

        const [rows] = await db.execute(sql, [idCliente]);

        return rows[0] || null;
    },

    async clientes(userId) {
        const sql = `
        SELECT
            id_cliente,
            nome,
            fone
        FROM cliente
        WHERE usuario_id = ?
        ORDER BY nome ASC;

            `;

        const [rows] = await db.execute(sql, [userId]);

        return rows
    },

    async atualizarCliente(dados) {

        const { nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro, id } = dados;
        
            const sql = `
            UPDATE cliente
            SET nome = ?, fone = ?, cpf = ?, data_nascimento = ?, cep = ?, cidade = ?, estado = ?, rg = ?, gmail = ?, numero_casa = ?, endereco = ?, complemento = ?, rua = ?, bairro = ?
            WHERE id_cliente = ? AND usuario_id = ?
        `;

        const [rows] = await db.execute(sql, [nome, fone, cpf, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro, id, userId]);

        return rows.affectedRows;
    },

    async excluirCliente(id_cliente, userId) {

        const sql = "DELETE FROM cliente WHERE id_cliente = ? AND usuario_id = ?";

        const [rows] = await db.execute(sql, [id_cliente, userId]);

        return rows.affectedRows;
    }

}