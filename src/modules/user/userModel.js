import db from "../../database/db.js";

export const userModel = {

  async findByEmail(email) {

    const sql = "SELECT * FROM users WHERE email = ?";

    const [rows] = await db.execute(sql, [email]);

    return rows[0] || null;
  },

  async findAll() {
    
    const sql = `
      SELECT
        id,
        name,
        email,
        phone
      FROM users
      ORDER BY name ASC
    `;

    const [rows] = await db.execute(sql);

    return rows;
  },
  
    async findById(userId) {
        
        const sql = "SELECT * FROM users WHERE id = ?";

        const [rows] = await db.execute(sql, [userId]);

        return rows[0] || null;
    },
    
    async patchUser(userId, fields) {

        const sets = [];
        const values = [];

        for (const [key, value] of Object.entries(fields)) {
            sets.push(`${key} = ?`);
            values.push(value);
        }

        if (sets.length === 0) return 0;

        const sql = `
            UPDATE users
            SET ${sets.join(", ")}
            WHERE id = ?
        `;

        values.push(userId);

        const [rows] = await db.execute(sql, values);
        return rows.affectedRows;
    }
};
