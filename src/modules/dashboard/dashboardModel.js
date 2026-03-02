import db from "../../database/db.js";

export const dashboardModel = {
    
    async dashboard(userId) {
        
        const sql = `   
        SELECT
            COUNT(DISTINCT cu.company_id) AS totalCompanies,

            SUM(ls.status = 'active')  AS totalActiveLinks,
            SUM(ls.status = 'pending') AS totalPendingLinks,

            SUM(gl.link_type_id = 50) AS totalCompanyOpening,
            SUM(gl.link_type_id = 51) AS totalCompanyChange,
            SUM(gl.link_type_id = 52) AS totalCompanyClosing

        FROM company_users cu

        JOIN companies c
            ON c.id = cu.company_id

        LEFT JOIN client_companies cc
            ON cc.company_id = c.id

        LEFT JOIN generated_links gl
            ON gl.client_company_id = cc.id

        LEFT JOIN link_statuses ls
            ON ls.generated_link_id = gl.id

        WHERE cu.user_id = ?;
        `;

        const [rows] = await db.execute(sql, [userId]);

        return rows[0] || {
            totalCompanies: 0,
            totalActiveLinks: 0,
            totalPendingLinks: 0,
            totalCompanyOpening: 0,
            totalCompanyChange: 0,
            totalCompanyClosing: 0,
        };
    },

    async linkTypes() {

        const sql = "SELECT * FROM link_types";

        const [rows] = await db.execute(sql);

        return rows;
    },

    async getClientDetails(clientId) {
        
        const sql = `
            SELECT 
                cl.id,
                cl.name AS client,
                cl.email,
                c.cnpj AS CNPJ,
                c.id AS companyId,
                c.name AS company,
                c.created_at
            FROM clients cl
            LEFT JOIN client_companies cc ON cl.id = cc.client_id
            LEFT JOIN companies c ON cc.company_id = c.id
            WHERE cl.id = ?
            `;

        const [rows] = await db.execute(sql, [clientId]);

        return rows;
    }
};
