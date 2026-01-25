import db from "../../database/db.js";

export const processoModel = {

    async allProcessByCnpjId(cnpjId, idProcess = null) {

        const sql = `
            SELECT 
            p.*, 
            t.tipo,
            g.data_expiracao,
            s.status
            FROM processo p
            JOIN tipo_processo t 
            ON p.id_tipo_processo = t.id_tipo_processo
            JOIN geracao_link g
            ON p.geracao_link_id = g.id_geracao_link
            JOIN status_link s
            ON g.id_geracao_link = s.geracao_link_id
            WHERE p.id_cnpj = ?
            ${idProcess ? "AND p.id_processo = ?" : ""}
            ORDER BY p.data_atualizacao DESC
        `;

    const params = idProcess ? [cnpjId, idProcess] : [cnpjId];

    const [rows] = await db.execute(sql, params);

    return rows;
    },

    async createGeracaoLink(linkGerado, clienteId, clienteCnpjId, dataExpiracaoFormatada, tipoProcessoId, conn) {

        const sql = `
        INSERT INTO geracao_link (link, cliente_id, cliente_cnpj_id, data_expiracao, tipo_processo_id)
        VALUES (?, ?, ?, ?, ?)
        `;

        const [rows] = await conn.execute(sql, [linkGerado, clienteId, clienteCnpjId, dataExpiracaoFormatada, tipoProcessoId]);

        return rows;
    },

    async createStatusLink(status, geracaoLinkId, conn) {

        const sql = `
        INSERT INTO status_link (status, geracao_link_id)
        VALUES (?, ?)
        `;

        const [rows] = await conn.execute(sql, [status || "pendente", geracaoLinkId]);

        return rows;
    },

    async insertProcess({clienteId, cnpjId, tipoProcessoId, geracaoLinkId, conn}) {

        const sql = `
        INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
        VALUES (?, ?, ?, NOW(), ?)
        `;

        const [rows] = await conn.execute(sql, [clienteId, cnpjId, tipoProcessoId, geracaoLinkId]);

        return rows;
    },

    async validateProcessType(tipoProcessoId) {

        const sql = `
        SELECT id_tipo_processo
        FROM tipo_processo
        WHERE id_tipo_processo = ?
        `;

        const [rows] = await db.execute(sql, [tipoProcessoId]);

        return rows[0] || null;
    },

    async excluirProcesso(idCnpj, conn) {

        const sql = "DELETE FROM processo WHERE id_cnpj = ?";

        const [rows] = await conn.execute(sql, [idCnpj]);

        return rows.affectedRows;
    },

    async excluirGeracaoLink(idClienteCnpj, conn) {
        
        const sql = "DELETE FROM geracao_link WHERE cliente_cnpj_id = ?";

        const [rows] = await conn.execute(sql, [idClienteCnpj]);

        return rows.affectedRows;
    }
}