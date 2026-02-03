import db from "../../database/db.js";

export const companyClientModel = {

  async findCompaniesByClient(clientId) {
    const sql = `
      SELECT c.*
      FROM companies c
      INNER JOIN client_companies cc ON c.id = cc.company_id
      WHERE cc.client_id = ?
    `;

    const [rows] = await db.execute(sql, [clientId]);

    return rows;
  },

  async findLinkById(linkId) {
    const sql = `
      SELECT client_id, company_id
      FROM client_companies
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [linkId]);

    return rows[0] || null;
  },

  async findByClientAndCompany(clientId, companyId, ignoreId = null) {

    let sql = `
      SELECT id
      FROM client_companies
      WHERE client_id = ? AND company_id = ?
    `;

    const params = [clientId, companyId];

    if (ignoreId) {
      sql += " AND id != ?";
      params.push(ignoreId);
    }

    const [rows] = await db.execute(sql, params);
    return rows[0] || null;
  },

  async create(clientId, companyId) {

    const sql = `
      INSERT INTO client_companies (client_id, company_id)
      VALUES (?, ?)
    `;

    const [result] = await db.execute(sql, [clientId, companyId]);

    return result;
  },

  async updateClient(linkId, clientId) {

    const sql = `
      UPDATE client_companies
      SET client_id = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [clientId, linkId]);

    return result.affectedRows;
  },

  async deleteById(linkId, conn) {

    const sql = "DELETE FROM client_companies WHERE id = ?";

    const [result] = await conn.execute(sql, [linkId]);
    
    return result.affectedRows;
  }
};
