import db from "../../database/db.js";

export const processModel = {

  async findAllByCompany(companyId, processId = null) {
    const sql = `
      SELECT 
        p.*,
        pt.name AS process_type,
        gl.expiration_date,
        ls.status
      FROM processes p
      JOIN process_types pt ON p.process_type_id = pt.id
      JOIN generated_links gl ON p.generated_link_id = gl.id
      JOIN link_statuses ls ON gl.id = ls.generated_link_id
      WHERE p.company_id = ?
      ${processId ? "AND p.id = ?" : ""}
      ORDER BY p.updated_at DESC
    `;

    const params = processId ? [companyId, processId] : [companyId];
    const [rows] = await db.execute(sql, params);

    return rows;
  },

  async createGeneratedLink(link, clientId, clientCompanyId, expiresAt, processTypeId, conn) {
    
    const sql = `
      INSERT INTO generated_links (url, client_id, client_company_id, expiration_date, process_type_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await conn.execute(sql, [
      link,
      clientId,
      clientCompanyId,
      expiresAt,
      processTypeId
    ]);

    return result;
  },

  async createLinkStatus(status, generatedLinkId, conn) {

    const sql = `
      INSERT INTO link_statuses (status, generated_link_id)
      VALUES (?, ?)
    `;

    await conn.execute(sql, [status || "pending", generatedLinkId]);
  },

  async createProcess({ clientId, companyId, processTypeId, generatedLinkId, conn }) {

    const sql = `
      INSERT INTO processes (client_id, company_id, process_type_id, updated_at, generated_link_id)
      VALUES (?, ?, ?, NOW(), ?)
    `;

    const [result] = await conn.execute(sql, [
      clientId,
      companyId,
      processTypeId,
      generatedLinkId
    ]);

    return result;
  },

  async validateProcessType(processTypeId) {
    const sql = `
      SELECT id
      FROM process_types
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [processTypeId]);

    return rows[0] || null;
  },

  async deleteByCompany(companyId, conn) {

    const sql = "DELETE FROM processes WHERE company_id = ?";
    const [result] = await conn.execute(sql, [companyId]);

    return result.affectedRows;
  },

  async deleteGeneratedLinksByCompany(clientCompanyId, conn) {

    const sql = "DELETE FROM generated_links WHERE client_company_id = ?";
    const [result] = await conn.execute(sql, [clientCompanyId]);
    
    return result.affectedRows;
  }
};
