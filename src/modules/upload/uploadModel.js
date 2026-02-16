import db from "../../database/db.js";

export const uploadModel = {

  async insertDocument({
    link,
    documentTypeId,
    clientCompanyId,
    generatedLinkId,
  }) {

    const sql = `
      INSERT INTO documents (
        url,
        document_type_id,
        client_company_id,
        generated_link_id
      )
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      link,
      documentTypeId,
      clientCompanyId,
      generatedLinkId,
    ]);

    return result.insertId;

  },

  async findGeneratedLink(generatedLinkId) {
    const sql = `
      SELECT id
      FROM generated_links
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [generatedLinkId]);

    return rows[0] ?? null;
  },
};
