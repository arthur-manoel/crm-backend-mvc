import db from "../../database/db.js";

export const dashboardModel = {
    
    async dashboard(usuarioId) {
        
        const sql = `
        SELECT
            COUNT(DISTINCT cu.cnpj_id) AS totalCnpjs,

            SUM(sl.status = 'ativo')    AS totalLinksAtivos,
            SUM(sl.status = 'pendente') AS totalLinksPendentes,

            SUM(p.id_tipo_processo = 50) AS totalAberturaCnpj,
            SUM(p.id_tipo_processo = 51) AS totalAlteracaoCnpj,
            SUM(p.id_tipo_processo = 52) AS totalFechamentoCnpj

        FROM cnpj_usuario cu

        JOIN cnpj c
            ON c.id_cnpj = cu.cnpj_id

        LEFT JOIN cliente_cnpj cc
            ON cc.cnpj_id = c.id_cnpj

        LEFT JOIN geracao_link gl
            ON gl.cliente_cnpj_id = cc.id_cliente_cnpj

        LEFT JOIN status_link sl
            ON sl.geracao_link_id = gl.id_geracao_link

        LEFT JOIN processo p
            ON p.id_cnpj = c.id_cnpj

        WHERE cu.usuario_id = ?;
        `;

        const [rows] = await db.execute(sql, [usuarioId]);

        return rows[0] || null;
    },
}