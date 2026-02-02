import db from "../../database/db.js";

export const authModel = {

    async findByEmail(email) {

        const sql = `
            SELECT
                u.id AS id,
                u.email,
                u.name AS name,
                r.name AS role,
                u.password_hash AS password
            FROM users u
            JOIN roles r ON u.role_id = r.id
            WHERE u.email = ?
        `;

        const [rows] = await db.execute(sql, [email]);

        return rows[0] || null;
    }

};
