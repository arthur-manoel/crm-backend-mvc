import db from "../../database/db.js";

export const linkModel = {

  async findByClientCompanyId(clientCompanyId) {
    const sql = `
      SELECT *
      FROM generated_links
      WHERE client_company_id = ?
    `;

    const [rows] = await db.execute(sql, [clientCompanyId]);
    return rows;
  },

  async clientCompanyExists(clientCompanyId) {
    const sql = `
      SELECT id
      FROM client_companies
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [clientCompanyId]);
    return rows[0] || null;
  },
};
