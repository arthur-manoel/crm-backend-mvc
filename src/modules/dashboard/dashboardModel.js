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

    async processTypes() {

        const sql = "SELECT * FROM tipo_processo";

        const [rows] = await db.execute(sql);

        return rows;
    },

    async getClientDetails(clienteId) {
        
        const sql = `
            SELECT 
                cl.id_cliente,
                cl.nome AS cliente,
                cl.gmail AS email,
                c.numero_cnpj AS CNPJ,
                c.id_cnpj AS id_CNPJ,
                c.nome AS nome_fantasia,
                c.data_criacao
            FROM cliente cl
            LEFT JOIN cliente_cnpj cc ON cl.id_cliente = cc.cliente_id
            LEFT JOIN cnpj c ON cc.cnpj_id = c.id_cnpj
            WHERE cl.id_cliente = ?
            `;

        
        const [rows] = await db.execute(sql, [clienteId]);

        return rows;

    }
}