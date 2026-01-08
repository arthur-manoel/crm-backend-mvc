import db from "../../database/db.js";

export const empresaModel = {

    async cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade) {

    const sql = "INSERT INTO cnpj (nome, numero_cnpj, data_criacao, descricao_atividade) VALUES (?, ?, ?, ?)";

    const [rows] = await db.execute(sql, [nome, cnpj, data_criacao, descricao_atividade]);


    return { id: rows.insertId, nome, cnpj, data_criacao, descricao_atividade };

    },

    async buscarCNPJ(cnpj) {

    const sql = "SELECT * FROM cnpj WHERE numero_cnpj = ?";
    const [rows] = await db.execute(sql, [cnpj]);

    return rows[0] || null;
    },

    async buscarPorId(idCnpj) {
        
        const sql = "SELECT id_cnpj FROM cnpj WHERE id_cnpj = ?";

        const [rows] = await db.execute(sql, [idCnpj]);

        return rows[0] || null;
    },

    async empresas() {
        
        const sql = `
            SELECT id_cnpj, nome, numero_cnpj, data_criacao, descricao_atividade
            FROM cnpj
            ORDER BY id_cnpj DESC
        `;

        const [rows] = await db.execute(sql);

        return rows;
    },

    async atualizarEmpresa(dados) {

        const { nome, descricao_atividade, id } = dados;

        const sql = "UPDATE cnpj SET nome = ?, descricao_atividade = ? WHERE id_cnpj = ?";

        const [rows] = await db.execute(sql, [nome, descricao_atividade, id]);

        return rows.affectedRows;
    },
    
    async excluirEmpresa(idCnpj, conn) {

        const sql =  "DELETE FROM cnpj WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;

    }
}