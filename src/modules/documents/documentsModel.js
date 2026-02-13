import db from '../../database/db.js';

export const documentsModel = {

  async listByCompany(clientCompanyId, documentTypeId = null) {

    let sql = `
      SELECT 
        d.*, 
        td.name AS document_type
      FROM documents d
      INNER JOIN document_types td 
        ON td.id = d.id
      WHERE d.client_company_id = ?
    `;

    const params = [clientCompanyId];

    if (documentTypeId) {
      sql += " AND d.id = ?";
      params.push(documentTypeId);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async getRequestedDocuments(ids) {
    
    const sql = `
      SELECT name
      FROM document_types
      WHERE id IN (${ids.map(() => '?').join(',')})
    `;

    const [rows] = await db.execute(sql, ids);
    return rows;
  },

  async getDocumentTypes() {

    const sql = "SELECT id, name FROM document_types";

    const [rows] = await db.execute(sql);
    return rows;
  }
};
