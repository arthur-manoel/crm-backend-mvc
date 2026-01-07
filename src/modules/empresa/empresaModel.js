import db from "../../database/db.js";

export const cnpjModel = {

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

    async empresas() {
        
        const sql = `
            SELECT id_cnpj, nome, numero_cnpj, data_criacao, descricao_atividade
            FROM cnpj
            ORDER BY id_cnpj DESC
        `;

        const [rows] = await db.execute(sql);

        return rows;
    },
}