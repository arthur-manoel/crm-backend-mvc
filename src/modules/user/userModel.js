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
  }

};
