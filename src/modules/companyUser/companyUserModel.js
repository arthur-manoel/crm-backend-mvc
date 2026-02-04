import db from "../../database/db.js";

export const companyUserModel = {

  async createLink({ userId, companyId, role }) {

    const sql = `
      INSERT INTO company_users (user_id, company_id, role)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [userId, companyId, role]);
    return result.insertId;
  },

  async findRole(userId, companyId) {

    const sql = `
      SELECT role
      FROM company_users
      WHERE user_id = ? AND company_id = ?
    `;

    const [rows] = await db.execute(sql, [userId, companyId]);
    return rows[0] || null;
  },

  async findLinkById(id) {

    const sql = `
      SELECT *
      FROM company_users
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [id]);
    return rows[0] || null;
  },

  async countAdmins(companyId) {

    const sql = `
      SELECT COUNT(*) AS total
      FROM company_users
      WHERE company_id = ? AND role = 'ADMIN'
    `;

    const [rows] = await db.execute(sql, [companyId]);
    return rows[0].total;
  },

  async updateRole(id, role) {

    const sql = `
      UPDATE company_users
      SET role = ?
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [role, id]);
    return rows.affectedRows;
  },

  async deleteLink(id) {

    const sql = `
      DELETE FROM company_users
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [id]);
    return rows.affectedRows;
  }
};
