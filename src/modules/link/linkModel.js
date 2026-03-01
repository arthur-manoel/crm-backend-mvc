import db from "../../database/db.js";

export const linkModel = {
  async findAllByClientCompany(clientCompanyId, linkId = null) {
    const sql = `
      SELECT
        gl.id,
        gl.client_company_id,
        gl.expiration_date,
        lt.name AS link_type,
        ls.status
      FROM generated_links gl
      JOIN link_types lt ON gl.link_type_id = lt.id
      LEFT JOIN link_statuses ls ON gl.id = ls.generated_link_id
      WHERE gl.client_company_id = ?
      ${linkId ? "AND gl.id = ?" : ""}
      ORDER BY gl.expiration_date DESC
    `;

    const params = linkId ? [clientCompanyId, linkId] : [clientCompanyId];
    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async createGeneratedLink(clientCompanyId, expiresAt, linkTypeId, conn) {
    const sql = `
      INSERT INTO generated_links (client_company_id, expiration_date, link_type_id)
      VALUES (?, ?, ?)
    `;
    const [result] = await conn.execute(sql, [
      clientCompanyId,
      expiresAt,
      linkTypeId
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

  async validateLinkType(linkTypeId) {
    const sql = `
      SELECT id FROM link_types WHERE id = ?
    `;
    const [rows] = await db.execute(sql, [linkTypeId]);
    return rows[0] || null;
  }
};