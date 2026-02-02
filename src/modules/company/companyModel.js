import db from "../../database/db.js";

export const companyModel = {

    async createCompany(name, cnpj, createdAt, activityDescription) {

        const sql = `
            INSERT INTO companies (name, cnpj, created_at, activity_description)
            VALUES (?, ?, ?, ?)
        `;

        const [rows] = await db.execute(sql, [name, cnpj, createdAt, activityDescription]);

        return { id: rows.insertId, name, cnpj, createdAt, activityDescription };
    },

    async findByCnpj(cnpj) {

        const sql = "SELECT * FROM companies WHERE cnpj = ?";
        const [rows] = await db.execute(sql, [cnpj]);

        return rows[0] || null;
    },

    async findById(companyId) {

        const sql = "SELECT id FROM companies WHERE id = ?";
        const [rows] = await db.execute(sql, [companyId]);

        return rows[0] || null;
    },

    async findClientCompany(clientId, companyId) {

        const sql = `
            SELECT c.*
            FROM companies c
            INNER JOIN client_companies cc ON c.id = cc.company_id
            WHERE cc.client_id = ? AND c.id = ?
        `;

        const [rows] = await db.execute(sql, [clientId, companyId]);

        return rows[0] || null;
    },

    async getCompanyActivities(companyId) {

        const sql = `
            SELECT 
                c.name AS company,
                a.name AS activity
            FROM companies c
            INNER JOIN company_activities ca ON c.id = ca.company_id
            INNER JOIN activities a ON ca.activity_id = a.id
            WHERE c.id = ?
        `;

        const [rows] = await db.execute(sql, [companyId]);

        return rows;
    },

    async updateCompany({ name, activityDescription, companyId }) {

        const sql = `
            UPDATE companies
            SET name = ?, activity_description = ?
            WHERE id = ?
        `;

        const [rows] = await db.execute(sql, [name, activityDescription, companyId]);

        return rows.affectedRows;
    },
    
    async deleteCompany(companyId, conn) {

        const sql = "DELETE FROM companies WHERE id = ?";

        const [rows] = await conn.execute(sql, [companyId]);

        return rows.affectedRows;
    }
};
