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

    async empresas(clienteId, cnpjId) {
        
        const sql = `
            SELECT cnpj.*
            FROM cnpj
            INNER JOIN cliente_cnpj ON cnpj.id_cnpj = cliente_cnpj.cnpj_id
            WHERE cliente_cnpj.cliente_id = ? AND cnpj.id_cnpj = ?;

        `;

        const [rows] = await db.execute(sql, [clienteId, cnpjId]);

        return rows[0] || null;
    },

    async companyActivity(cnpjId) {

        const sql = `
        SELECT 
            cnpj.nome AS company,
            cnae.nome AS cnae
        FROM cnpj
        INNER JOIN cnpj_cnae 
            ON cnpj.id_cnpj = cnpj_cnae.cnpj_id
        INNER JOIN cnae 
            ON cnpj_cnae.cnae_id = cnae.id_cnae
        WHERE cnpj.id_cnpj = ?; 
        `;

        const [rows] = await db.execute(sql, [cnpjId]);

        return rows;

    },

    async atualizarEmpresa(dados) {

        const { nome, descricao_atividade, cnpjId } = dados;

        const sql = "UPDATE cnpj SET nome = ?, descricao_atividade = ? WHERE id_cnpj = ?";

        const [rows] = await db.execute(sql, [nome, descricao_atividade, cnpjId]);

        return rows.affectedRows;
    },
    
    async excluirEmpresa(idCnpj, conn) {

        const sql =  "DELETE FROM cnpj WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;

    }
}